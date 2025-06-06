/**
 * Lectures in a Module
 */

import { CourseLectureType } from "@/types/common.types";
import { BaseDocument, BaseSchema } from "./base.model";
import mongoose, { Schema, model } from "mongoose";

// Define lecture type
interface CourseLecture extends BaseDocument {
  _id: mongoose.Types.ObjectId;
  moduleId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  title: string;
  type: CourseLectureType;
  duration: string;
  videoUrl?: string;
  documentUrl?: string;
  assignmentUrl?: string;
}

// Define lecture schema
const CourseLectureSchema = new Schema<CourseLecture>({
  moduleId: {
    type: Schema.Types.ObjectId,
    ref: "Module",
    required: true,
  },
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
  type: {
    type: String,
    enum: Object.values(CourseLectureType),
    required: true,
  },
  duration: {
    type: String,
    required: true,
    trim: true,
  },
  videoUrl: {
    type: String,
    trim: true,
    validate: {
      validator: function (v: string) {
        if (!v) return true; // Allow empty values
        try {
          new URL(v);
          return true;
        } catch {
          return false;
        }
      },
      message: "Invalid video URL format",
    },
  },
  documentUrl: {
    type: String,
    trim: true,
    validate: {
      validator: function (v: string) {
        if (!v) return true;
        try {
          new URL(v);
          return true;
        } catch {
          return false;
        }
      },
      message: "Invalid document URL format",
    },
  },
  assignmentUrl: {
    type: String,
    trim: true,
    validate: {
      validator: function (v: string) {
        if (!v) return true;
        try {
          new URL(v);
          return true;
        } catch {
          return false;
        }
      },
      message: "Invalid assignment URL format",
    },
  },
});

// Add validation based on lecture type
CourseLectureSchema.pre("validate", function () {
  if (this.type === CourseLectureType.Video && !this.videoUrl) {
    this.invalidate("videoUrl", "Video URL is required for video lectures");
  }
  if (this.type === CourseLectureType.Document && !this.documentUrl) {
    this.invalidate(
      "documentUrl",
      "Document URL is required for document lectures"
    );
  }
  if (this.type === CourseLectureType.Assignment && !this.assignmentUrl) {
    this.invalidate(
      "assignmentUrl",
      "Assignment URL is required for assignment lectures"
    );
  }
});

CourseLectureSchema.add(BaseSchema);

// Indexes for better performance
CourseLectureSchema.index({ moduleId: 1 });
CourseLectureSchema.index({ courseId: 1 });

export const CourseLecture = model<CourseLecture>(
  "Lecture",
  CourseLectureSchema
);
