import mongoose, { Schema, model } from "mongoose";
import { BaseDocument, BaseSchema } from "./base.model";

// Define course type
interface Course extends BaseDocument {
  title: string;
  subtitle: string;
  description: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: number;

  thumbnail?: string;
  enrolledStudents: string[];
  lectures: mongoose.Types.ObjectId[];
  modules: mongoose.Types.ObjectId[];
  createdBy: mongoose.Types.ObjectId;
  isPublished: boolean;

  reviewCount: number;
  rating: number;
  reviews: mongoose.Types.ObjectId[];
}

// Define course schema
const CourseSchema = new Schema<Course>({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner",
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  enrolledStudents: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],

  modules: [
    {
      type: Schema.Types.ObjectId,
      ref: "CourseModule",
      default: [],
    },
  ],
  lectures: [
    {
      type: Schema.Types.ObjectId,
      ref: "Lecture",
      default: [],
    },
  ],

  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },

  reviewCount: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
      default: [],
    },
  ],
});

// Add base schema to Course schema
CourseSchema.add(BaseSchema);

// Export Course model
export const Course = model<Course>("Course", CourseSchema);
