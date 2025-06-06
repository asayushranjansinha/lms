import mongoose, { Schema, model } from "mongoose";
import { BaseDocument, BaseSchema } from "./base.model";

export interface CourseReview extends BaseDocument {
  rating: number;
  review: string;
  courseId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
}

const CourseReviewSchema = new Schema<CourseReview>({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  review: {
    type: String,
    required: true,
    trim: true,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

CourseReviewSchema.add(BaseSchema);

export const CourseReview = model<CourseReview>("Review", CourseReviewSchema);
