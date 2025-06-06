import { Router } from "express";
import { createStripeCheckoutSessionController, verifyStripeSessionController } from "@/controllers/payment.controller";
import { protect } from "@/middlewares/auth.middleware";


const paymentRoutes = Router();

paymentRoutes.post(
  "/stripe/create-checkout-session",
  protect,
  createStripeCheckoutSessionController
);

paymentRoutes.post(
  "/stripe/verify-session/:sessionId",
  protect,
  verifyStripeSessionController
);

export default paymentRoutes;