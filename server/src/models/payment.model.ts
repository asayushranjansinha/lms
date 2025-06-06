import mongoose, { Schema, model } from "mongoose";
import { BaseDocument, BaseSchema } from "./base.model";

interface Payment extends BaseDocument {
  userId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed" | "cancelled" | "refunded";
  paymentMethod: "stripe";

  // Stripe Checkout specific
  stripeSessionId: string;
  checkoutUrl?: string;

  // Metadata
  paymentDate?: Date;
  refundedAmount?: number;
  refundDate?: Date;
  failureReason?: string;
}

const PaymentSchema = new Schema<Payment>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: "inr",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed", "cancelled", "refunded"],
    default: "pending",
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["stripe"],
    default: "stripe",
    required: true,
  },
  stripeSessionId: {
    type: String,
    required: true,
    unique: true,
  },
  checkoutUrl: {
    type: String,
  },
  paymentDate: {
    type: Date,
  },
  refundedAmount: {
    type: Number,
    default: 0,
  },
  refundDate: {
    type: Date,
  },
  failureReason: {
    type: String,
  },
});

PaymentSchema.add(BaseSchema);
PaymentSchema.index({ userId: 1, courseId: 1 });
PaymentSchema.index({ status: 1 });

export const Payment = model<Payment>("Payment", PaymentSchema);
