import { Request, Response, NextFunction } from "express";
import { CourseReview } from "@/models/review.model";
import { ApiResponseUtil } from "@/utils/api-response";
import { BadRequestError, ForbiddenError, NotFoundError } from "@/utils/app.error";
import { asyncHandler } from "@/utils/async-handler";
import mongoose from "mongoose";
import { Course } from "@/models/course.model";
import { User } from "@/models/user.model";

/**
 * Create Review Controller
 */
export const addReviewController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const courseId = req.params.courseId;

    // Validate rating from 1 to 5 and review message
    const { rating, review } = req.body;

    // Validate user and course IDs
    const [userDoc, courseDoc] = await Promise.all([
      User.findById(userId),
      Course.findById(courseId),
    ]);
    if (!userDoc) {
      throw new NotFoundError("User not found");
    }
    if (!courseDoc || courseDoc.isDeleted) {
      throw new NotFoundError("Course not found");
    }

    // Check if user is enrolled in the course
    const isEnrolled = courseDoc.enrolledStudents
      .map((studentId) => studentId.toString())
      .includes(req.user?.id as string);

    if(!isEnrolled) {
      throw new ForbiddenError("Enroll in the course to leave a review");
    }

    const newReview = await CourseReview.create({
      rating,
      review,
      courseId,
      userId,
    });

    // Recalculate course rating
    await recalculateCourseRating(courseId);

    return ApiResponseUtil.created(
      res,
      newReview,
      "Review created successfully"
    );
  }
);

/**
 * Get Reviews by Course ID
 */
export const getReviewsByCourseIdController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.courseId;
    const reviews = await CourseReview.find({ courseId })
      .populate("userId", "name profilePicture bio")
      .sort({ createdAt: -1 });


      console.log("Review 1: ", reviews[0].toObject());


      const remappedReviews = reviews.map((r) => {
        const reviewObj = r.toObject();
        return {
          ...reviewObj,
          user: reviewObj.userId,
          userId: undefined,
          createdAt: reviewObj.createdAt,
        };
      });
    return ApiResponseUtil.success(
      res,
      remappedReviews,
      "Reviews retrieved successfully"
    );
  }
);

/**
 * Delete review by ID
 */
export const deleteReviewByIdController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);

/**
 *
 */

const recalculateCourseRating = async (courseId: string) => {
  const courseObjId = new mongoose.Types.ObjectId(courseId);

  const result = await CourseReview.aggregate([
    { $match: { courseId: courseObjId } },
    {
      $group: {
        _id: "$courseId",
        averageRating: { $avg: "$rating" },
      },
    },
  ]);

  const avg = result[0]?.averageRating || 0;

  await Course.findByIdAndUpdate(courseId, { rating: avg });
};

