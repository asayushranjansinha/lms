import { Router } from "express";
import { authRouter } from "./auth.routes";
import { userRoutes } from "./user.routes";
import { courseRoutes } from "./course.routes";
import paymentRoutes from "./payment.routes";
import { reviewRoutes } from "./review.routes";

const router = Router();

/**
 * Auth Routes
 */
router.use("/auth", authRouter);

/**
 * User Routes
 */
router.use("/user", userRoutes);

/**
 * Course Routes
 */
router.use("/course", courseRoutes);

/**
 * Checkout Routes
 */
router.use("/payment", paymentRoutes);

/**
 * Review Routes
 */
router.use("/review", reviewRoutes);

export { router as appRouter };
