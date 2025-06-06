/**
 * User model
 */

import { BaseDocument, BaseSchema } from "@/models/base.model";
import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

// Create interface for User model
interface User extends BaseDocument {
  id: string;

  // Basic user info
  name: string;
  email: string;
  password: string;
  role: "student" | "instructor" | "admin";

  // User profile info
  bio?: string;
  website?: string;
  location?: string;
  profilePicture?: string;
  gender?: "male" | "female" | "other";
  phoneNumber?: string;

  // Course
  coursesEnrolled: string[];
  activeCourses: string[];
  completedCourses: string[];

  // Security info
  termsAccepted: boolean;
  refreshToken: string | null;

  // Methods
  comparePassword(password: string): Promise<boolean>;
}

// Create schema

const UserSchema = new Schema<User>({
  // Basic user info
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please provide a valid email"],
    unique: [true, "Email already exists"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [8, "Password must be at least 8 characters"],
    select: false,
  },
  role: {
    type: String,
    enum: ["student", "instructor", "admin"],
    default: "student",
  },

  // User profile info
  bio: {
    type: String,
    maxlength: 500,
  },
  website: {
    type: String,
    maxlength: 500,
  },
  location: {
    type: String,
    maxlength: 500,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    default: "male",
  },
  phoneNumber: {
    type: String,
    minlength: 10,
    maxlength: 10,
  },
  profilePicture: {
    type: String,
  },

  // Course info
  coursesEnrolled: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
      default: [],
    },
  ],
  activeCourses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
      default: [],
    },
  ],
  completedCourses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
      default: [],
    },
  ],

  termsAccepted: {
    type: Boolean,
    required: [true, "Please accept the terms and conditions"],
    default: false,
  },
  refreshToken: {
    type: String,
    default: null,
    select: false,
  },
});

// Pre save hook to hash password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err as Error);
  }
});

// Method to compare password
UserSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

// Index
UserSchema.index({ email: 1 });

// Add base schema to User schema
UserSchema.add(BaseSchema);

// Export User model
export const User = model<User>("User", UserSchema);
