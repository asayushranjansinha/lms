/**
 * Modules in a Course
 */

import { BaseDocument, BaseSchema } from "./base.model";
import mongoose, { Schema, model } from "mongoose";

// Define module type
interface CourseModule extends BaseDocument {
  courseId: mongoose.Types.ObjectId;
  title: string;
  duration: string;
  lectures: mongoose.Types.ObjectId[];
}

// Define module schema with validation
const CourseModuleSchema = new Schema<CourseModule>({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  duration: {
    type: String,
    required: true,
    trim: true,
  },
  lectures: [
    {
      type: Schema.Types.ObjectId,
      ref: "Lecture",
    },
  ],
});

CourseModuleSchema.add(BaseSchema);

// Indexes
CourseModuleSchema.index({ courseId: 1 });

// Export CourseModule model
export const CourseModule = model<CourseModule>("Module", CourseModuleSchema);
