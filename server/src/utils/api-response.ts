import {
  ApiResponse,
  PaginatedResponse,
  PaginationOptions,
} from "@/types/common.types";
import { Response } from "express";

export class ApiResponseUtil {
  static success<T>(
    res: Response,
    data: T,
    message = "Success",
    statusCode = 200
  ): Response<ApiResponse<T>> {
    const response: ApiResponse<T> = {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    };

    return res.status(statusCode).json(response);
  }

  static error(
    res: Response,
    message: string,
    statusCode = 500,
    error?: string
  ): Response<ApiResponse> {
    const response: ApiResponse = {
      success: false,
      message,
      error: error || "An unexpected error occurred",
      timestamp: new Date().toISOString(),
    };

    return res.status(statusCode).json(response);
  }

  static paginated<T>(
    res: Response,
    data: T[],
    total: number,
    options: PaginationOptions,
    message = "Success",
    statusCode = 200
  ): Response<PaginatedResponse<T>> {
    const totalPages = Math.ceil(total / options.limit);
    const hasNext = options.page < totalPages;
    const hasPrev = options.page > 1;

    const response: PaginatedResponse<T> = {
      success: true,
      message,
      data,
      pagination: {
        page: options.page,
        limit: options.limit,
        total,
        totalPages,
        hasNext,
        hasPrev,
      },
      timestamp: new Date().toISOString(),
    };

    return res.status(statusCode).json(response);
  }

  static created<T>(
    res: Response,
    data: T,
    message = "Resource created successfully"
  ): Response<ApiResponse<T>> {
    return this.success(res, data, message, 201);
  }

  static noContent(
    res: Response,
    message = "No content"
  ): Response<ApiResponse> {
    const response: ApiResponse = {
      success: true,
      message,
      timestamp: new Date().toISOString(),
    };

    return res.status(204).json(response);
  }
}
