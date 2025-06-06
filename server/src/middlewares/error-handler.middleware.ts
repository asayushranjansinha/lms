import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/app.error";
import { logger } from "@/config/logger";
import { config } from "@/config/env";

/**
 * Global error handler middleware
 */
export const globalErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let isOperational = false;

  // Handle different error types
  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    isOperational = error.isOperational;
  } else if (error.name === "ValidationError") {
    statusCode = 400;
    message = "Validation Error";
  } else if (error.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
  } else if (error.name === "MongoError" && (error as any).code === 11000) {
    statusCode = 409;
    message = "Duplicate field value";
  } else if (error.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  } else if (error.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  // Log the error
  logger.error(`Error ${statusCode}: ${message}`, {
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get("User-Agent"),
    ...(config.NODE_ENV === "development" && { stack: error.stack }),
  });

  // Send error response
  res.status(statusCode).json({
    status: "error",
    message,
    ...(config.NODE_ENV === "development" && {
      error: error.message,
      stack: error.stack,
    }),
  });
};
