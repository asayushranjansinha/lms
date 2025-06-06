import { Router } from "express";
import {
  deleteReviewByIdController,
  getReviewsByCourseIdController,
  addReviewController,
} from "@/controllers/review.controllers";
import { protect } from "@/middlewares/auth.middleware";

const reviewRoutes = Router();

reviewRoutes.post("/:courseId",protect, addReviewController);
reviewRoutes.get("/:courseId", getReviewsByCourseIdController);

export { reviewRoutes };