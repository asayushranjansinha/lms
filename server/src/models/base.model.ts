import { Document, Schema } from "mongoose";

// Common fields for all models
export interface BaseDocument extends Document {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  isDeleted: boolean;
}

// Base schema for all models
export const BaseSchema = new Schema<BaseDocument>(
  {
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
  },
  {
    toJSON: {
      transform: (_doc, ret) => {
        delete ret.password;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.deletedAt;
        delete ret.isDeleted;
        return ret;
      },
    },
    toObject: {
      transform: (_doc, ret) => {
        delete ret.password;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.deletedAt;
        delete ret.isDeleted;
        return ret;
      },
    },
  }
);
