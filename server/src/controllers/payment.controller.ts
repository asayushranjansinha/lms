import { config } from "@/config/env";
import { stripe } from "@/config/stripe";
import { Course } from "@/models/course.model";
import { Payment } from "@/models/payment.model";
import { ApiResponseUtil } from "@/utils/api-response";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "@/utils/app.error";
import { asyncHandler } from "@/utils/async-handler";
import { NextFunction, Request, Response } from "express";
import Stripe from "stripe";

/**
 * Create Stripe Checkout Session Controller
 */
export const createStripeCheckoutSessionController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { courseId } = req.body;
    const userId = req.user?.id;
    const userEmail = req.user?.email;

    if (!userId || !userEmail) {
      throw new BadRequestError("User not authenticated or email missing");
    }

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      throw new NotFoundError("Course not found");
    }

    // Check if already enrolled
    if (course.enrolledStudents.includes(userId)) {
      throw new ConflictError("Already enrolled in this course");
    }

    // Check if a completed payment exists
    const existingCompletedPayment = await Payment.findOne({
      userId,
      courseId,
      status: "completed",
    });

    if (existingCompletedPayment) {
      throw new ConflictError("Payment already completed for this course");
    }

    // Optional: Check for existing pending session (can reuse it)
    const existingPendingPayment = await Payment.findOne({
      userId,
      courseId,
      status: "pending",
    });

    if (existingPendingPayment) {
      return ApiResponseUtil.success(
        res,
        {
          sessionId: existingPendingPayment.stripeSessionId,
          sessionUrl: existingPendingPayment.checkoutUrl,
          paymentId: existingPendingPayment.id,
        },
        "Pending checkout session retrieved"
      );
    }

    try {
      // Create Stripe Checkout Session
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: course.title,
                description: course.subtitle || "Course enrollment",
                images: course.thumbnail ? [course.thumbnail] : [],
              },
              unit_amount: Math.round(course.price * 100),
            },
            quantity: 1,
          },
        ],
        success_url: `${config.CLIENT_URL}/payments/success?session_id={CHECKOUT_SESSION_ID}&courseId=${courseId}`,
        cancel_url: `${config.CLIENT_URL}/payments/failure?courseId=${courseId}`,

        metadata: {
          courseId: course.id,
          userId,
        },
        customer_email: userEmail,
      });

      // Save to DB
      const payment = new Payment({
        userId,
        courseId,
        amount: course.price,
        currency: "inr",
        stripeSessionId: session.id,
        checkoutUrl: session.url,
        status: "pending",
      });

      await payment.save();

      return ApiResponseUtil.success(
        res,
        {
          sessionId: session.id,
          sessionUrl: session.url,
          paymentId: payment.id,
        },
        "Checkout session created successfully"
      );
    } catch (error) {
      console.error("Stripe checkout session creation error:", error);
      throw new BadRequestError("Failed to create checkout session");
    }
  }
);

/**
 * Verify Stripe Session Controller
 */
export const verifyStripeSessionController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { sessionId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      throw new BadRequestError("User not authenticated");
    }

    if (!sessionId) {
      throw new BadRequestError("Session ID is required");
    }

    try {
      // Retrieve checkout session from Stripe
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      if (session.payment_status !== "paid") {
        throw new BadRequestError("Payment not completed");
      }

      // Find payment in database
      const payment = await Payment.findOne({
        stripeSessionId: sessionId,
        userId,
      });

      if (!payment) {
        throw new NotFoundError("Payment record not found");
      }

      // Update payment status if not already completed
      if (payment.status !== "completed") {
        payment.status = "completed";
        payment.paymentDate = new Date();
        payment.stripeSessionId = sessionId;
        await payment.save();

        // Enroll user in course
        const course = await Course.findById(payment.courseId);
        if (course && !course.enrolledStudents.includes(userId)) {
          course.enrolledStudents.push(userId);
          await course.save();
        }
      }

      return ApiResponseUtil.success(
        res,
        {
          paymentId: payment.id,
          status: payment.status,
          courseId: payment.courseId,
          sessionId: session.id,
        },
        "Payment verified and enrollment successful"
      );
    } catch (error) {
      console.error("Payment verification error:", error);
      throw new BadRequestError("Failed to verify payment");
    }
  }
);

/**
 * Get User Stripe Payments Controller
 */
export const getUserStripePaymentsController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;

    if (!userId) {
      throw new BadRequestError("User not authenticated");
    }

    const payments = await Payment.find({ userId })
      .populate("courseId", "title subtitle thumbnail price")
      .sort({ createdAt: -1 });

    return ApiResponseUtil.success(
      res,
      { payments },
      "Payments retrieved successfully"
    );
  }
);

/**
 * Stripe Webhook Controller
 */
export const stripeWebhookController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const sig = req.headers["stripe-signature"] as string;
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        config.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      throw new BadRequestError("Invalid webhook signature");
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(
          event.data.object as Stripe.Checkout.Session
        );
        break;

      case "payment_intent.payment_failed":
        await handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return ApiResponseUtil.success(res, {}, "Webhook handled successfully");
  }
);

/**
 * Handle failed payment
 */
const handlePaymentFailed = async (paymentIntent: Stripe.PaymentIntent) => {
  try {
    const payment = await Payment.findOne({
      stripePaymentIntentId: paymentIntent.id,
    });

    if (payment) {
      payment.status = "failed";
      payment.failureReason = paymentIntent.last_payment_error?.message;
      await payment.save();

      console.log(`Payment failed for intent: ${paymentIntent.id}`);
    }
  } catch (error) {
    console.error("Error handling payment failed:", error);
  }
};

/**
 * Refund Stripe Payment Controller
 */
export const refundStripePaymentController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { paymentId } = req.params;
    const { amount } = req.body; // Optional partial refund amount

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      throw new NotFoundError("Payment not found");
    }

    if (payment.status !== "completed") {
      throw new BadRequestError("Can only refund completed payments");
    }

    if (!payment.stripePaymentIntentId) {
      throw new BadRequestError("Payment intent ID not found");
    }

    try {
      const refundAmount = amount ? Math.round(amount * 100) : undefined;

      // Create refund in Stripe
      const refund = await stripe.refunds.create({
        payment_intent: payment.stripePaymentIntentId,
        amount: refundAmount,
      });

      // Update payment record
      const refundedAmount = refund.amount / 100;
      payment.refundedAmount = (payment.refundedAmount || 0) + refundedAmount;
      payment.refundDate = new Date();

      if (payment.refundedAmount >= payment.amount) {
        payment.status = "refunded";

        // Remove user from course enrollment
        const course = await Course.findById(payment.courseId);
        if (course) {
          course.enrolledStudents = course.enrolledStudents.filter(
            (studentId) => !studentId.equals(payment.userId)
          );
          await course.save();
        }
      }

      await payment.save();

      return ApiResponseUtil.success(
        res,
        {
          refundId: refund.id,
          refundedAmount,
          paymentStatus: payment.status,
        },
        "Refund processed successfully"
      );
    } catch (error) {
      console.error("Refund processing error:", error);
      throw new BadRequestError("Failed to process refund");
    }
  }
);

/**
 * Get Stripe Session Details Controller
 */
export const getStripeSessionDetailsController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { sessionId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      throw new BadRequestError("User not authenticated");
    }

    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      const payment = await Payment.findOne({
        stripeSessionId: sessionId,
        userId,
      }).populate("courseId", "title subtitle thumbnail");

      if (!payment) {
        throw new NotFoundError("Payment session not found");
      }

      return ApiResponseUtil.success(
        res,
        {
          session: {
            id: session.id,
            status: session.status,
            paymentStatus: session.payment_status,
            amountTotal: session.amount_total ? session.amount_total / 100 : 0,
            currency: session.currency,
          },
          payment,
        },
        "Session details retrieved successfully"
      );
    } catch (error) {
      console.error("Error retrieving session details:", error);
      throw new BadRequestError("Failed to retrieve session details");
    }
  }
);
