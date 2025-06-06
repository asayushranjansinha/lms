import { logger } from "@/config/logger";
import { Course } from "@/models/course.model";
import { CourseLecture } from "@/models/lecture.model";
import { CourseModule } from "@/models/module.model";
import { CourseReview } from "@/models/review.model";
import { CourseLectureType } from "@/types/common.types";
import { ApiResponseUtil } from "@/utils/api-response";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "@/utils/app.error";
import { asyncHandler } from "@/utils/async-handler";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

type SearchCoursesQuery = {
  query?: string;
  category?: string[] | string;
  sortByPrice?: "low" | "high" | "";
  level?: "Beginner" | "Intermediate" | "Advanced";
  minPrice?: number;
  maxPrice?: number;
};

/**
 * Create Course Controller
 */
export const createCourseController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseData = req.body;

    // Create a new course
    const newCourse = await Course.create({
      ...courseData,
      createdBy: req.user?.id,
    });

    // Return the created course
    return ApiResponseUtil.created(
      res,
      newCourse,
      "Course created successfully"
    );
  }
);

/**
 * Search courses controller
 */
export const searchCoursesController = asyncHandler(
  async (
    req: Request<{}, {}, {}, SearchCoursesQuery>,
    res: Response,
    _next: NextFunction
  ) => {
    const {
      query = "",
      category = [],
      sortByPrice = "",
      level = null,
      minPrice,
      maxPrice,
    } = req.query;

    // Normalize categories
    const categoriesArray: string[] =
      typeof category === "string"
        ? category
            .split(/[.,]/)
            .map((cat) => cat.trim())
            .filter(Boolean)
        : category;

    const normalizedCategories = normalizeCategoriesArray(categoriesArray);

    const createSearchQuery: any = {
      isPublished: true,
      isDeleted: false,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { subTitle: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    };

    // Apply filters
    if (normalizedCategories.length > 0) {
      createSearchQuery.category = { $in: normalizedCategories };
    }

    if (level) {
      createSearchQuery.level = level;
    }

    if (minPrice || maxPrice) {
      createSearchQuery.price = {};
      if (minPrice) createSearchQuery.price.$gte = Number(minPrice);
      if (maxPrice) createSearchQuery.price.$lte = Number(maxPrice);
    }

    // Sorting
    const sortOptions: Record<string, 1 | -1> = {};
    if (sortByPrice === "low") {
      sortOptions.price = 1;
    } else if (sortByPrice === "high") {
      sortOptions.price = -1;
    }

    // Fetch courses
    const courses = await Course.find(createSearchQuery)
      .populate({ path: "createdBy", select: "name _id" })
      .sort(sortOptions)
      .lean();

    // Transform enrolledStudents & reviews to counts
    const transformedCourses = courses.map((course) => ({
      ...course,
      enrolledStudents: course.enrolledStudents?.length || 0,
      reviews: course.reviews?.length || 0,
    }));

    return ApiResponseUtil.success(
      res,
      transformedCourses,
      "Courses fetched successfully"
    );
  }
);

/**
 * Get Course by ID
 */
export const getCourseByIdController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.id;

    const course = await Course.findById(courseId).populate(
      "createdBy",
      "name profilePicture bio website location"
    );

    if (!course) {
      throw new NotFoundError("Course not found");
    }

    const isEnrolled = course.enrolledStudents
      .map((studentId) => studentId.toString())
      .includes(req.user?.id as string);

    // Fetch modules with populated lectures
    const modules = await CourseModule.find({ courseId })
      .populate({
        path: "lectures",
        model: "Lecture",
        select: "title duration type videoUrl documentUrl assignmentUrl",
        options: { sort: { createdAt: 1 } },
      })
      .sort({ createdAt: 1 });

    // ✅ Fetch and transform reviews
    const reviews = await CourseReview.find({ courseId })
      .select("+createdAt")
      .populate("userId", "name profilePicture bio")
      .sort({ createdAt: -1 });

    // Handle empty reviews array
    const remappedReviews =
      reviews.length > 0
        ? reviews.map((r) => {
            const reviewObj = r.toObject({
              transform: false,
            });
            return {
              ...reviewObj,
              user: reviewObj.userId,
              userId: undefined,
            };
          })
        : [];

    const courseData = {
      ...course.toObject(),
      isEnrolled,
      enrolledStudents: course.enrolledStudents.length,
      modules,
      reviews: remappedReviews,
    };

    return ApiResponseUtil.success(
      res,
      courseData,
      "Course fetched successfully"
    );
  }
);

/**
 * Update Course by ID
 */
export const updateCourseByIdController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.id;
    const courseData = req.body;

    const course = await Course.findByIdAndUpdate(courseId, courseData, {
      new: true,
      runValidators: true,
    });

    if (!course) {
      throw new NotFoundError("Course not found");
    }

    return ApiResponseUtil.success(res, course, "Course updated successfully");
  }
);

/**
 * Delete Course by ID
 * Soft deletes the course
 */
export const deleteCourseByIdController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.id;

    const course = await Course.findById(courseId);

    if (!course) {
      throw new NotFoundError("Course not found");
    }

    // Soft delete the course
    course.isDeleted = true;
    course.deletedAt = new Date(Date.now());
    course.isPublished = false;

    // Save the course
    await course.save();

    return ApiResponseUtil.success(res, course, "Course deleted successfully");
  }
);

/**
 * Get all modules for a course
 */
export const getCourseModulesController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      throw new BadRequestError("Invalid course ID format");
    }

    const modules = await CourseModule.find({ courseId })
      .populate({
        path: "lectures",
        model: "Lecture",
        select: "title duration type videoUrl documentUrl assignmentUrl",
        options: { sort: { createdAt: 1 } },
      })
      .sort({ createdAt: 1 });

    return ApiResponseUtil.success(
      res,
      modules,
      "Modules retrieved successfully"
    );
  }
);

/**
 * Get module by course Id and module Id
 */
export const getCourseModuleByIdController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id, moduleId } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(id) ||
      !mongoose.Types.ObjectId.isValid(moduleId)
    ) {
      throw new BadRequestError("Invalid ID format");
    }

    const module = await CourseModule.findById(moduleId).populate({
      path: "lectures",
      model: "Lecture",
      select: "title duration type videoUrl documentUrl assignmentUrl",
      options: { sort: { createdAt: 1 } }, // Sort lectures by creation time
    });

    if (!module) {
      throw new NotFoundError("Module not found");
    }

    return ApiResponseUtil.success(
      res,
      module,
      "Module retrieved successfully"
    );
  }
);

/**
 * Add modules to course
 */

interface CreateModuleRequest {
  title: string;
  duration: string;
  lectures: {
    title: string;
    duration: string;
    type: CourseLectureType;
    videoUrl?: string;
    documentUrl?: string;
    assignmentUrl?: string;
  }[];
}

export const addCourseModuleController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const moduleData: CreateModuleRequest = req.body;
    const courseId = req.params.id;

    // Validate courseId format
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      throw new BadRequestError("Invalid course ID format");
    }

    // Validate request body
    if (
      !moduleData.title ||
      !moduleData.duration ||
      !moduleData.lectures ||
      !Array.isArray(moduleData.lectures)
    ) {
      throw new BadRequestError(
        "Missing required fields: title, duration, and lectures array"
      );
    }

    if (moduleData.lectures.length === 0) {
      throw new BadRequestError("At least one lecture is required");
    }

    // Verify course exists
    const courseExists = await Course.findById(courseId);
    if (!courseExists) {
      throw new NotFoundError("Course not found");
    }

    try {
      // Create the module first
      const createdModule = await CourseModule.create({
        courseId: new mongoose.Types.ObjectId(courseId),
        title: moduleData.title.trim(),
        duration: moduleData.duration.trim(),
        lectures: [], // Will be filled after creating lectures
      });

      const lectureIds: mongoose.Types.ObjectId[] = [];

      // Create lectures for the module
      for (const lectureData of moduleData.lectures) {
        const lecturePayload: any = {
          moduleId: createdModule._id,
          courseId: new mongoose.Types.ObjectId(courseId),
          title: lectureData.title.trim(),
          duration: lectureData.duration.trim(),
          type: lectureData.type,
        };

        if (lectureData.videoUrl?.trim()) {
          lecturePayload.videoUrl = lectureData.videoUrl.trim();
        }
        if (lectureData.documentUrl?.trim()) {
          lecturePayload.documentUrl = lectureData.documentUrl.trim();
        }
        if (lectureData.assignmentUrl?.trim()) {
          lecturePayload.assignmentUrl = lectureData.assignmentUrl.trim();
        }

        const lecture = await CourseLecture.create(lecturePayload);
        lectureIds.push(lecture._id);
      }

      // Update module with lecture IDs
      createdModule.lectures = lectureIds;
      await createdModule.save();

      // Return the created module with populated lecture details
      const result = await CourseModule.findById(createdModule._id).populate({
        path: "lectures",
        model: "Lecture",
        select: "title duration type videoUrl documentUrl assignmentUrl",
      });

      return ApiResponseUtil.created(
        res,
        result,
        "Module created successfully"
      );
    } catch (error: any) {
      logger.error("Error creating module:", error);

      if (error.name === "ValidationError") {
        const validationErrors = Object.values(error.errors).map(
          (err: any) => err.message
        );
        throw new BadRequestError(
          `Validation error: ${validationErrors.join(", ")}`
        );
      }

      throw new InternalServerError("Failed to create module");
    }
  }
);

/**
 * Update Course Module Controller
 */
export const updateCourseModuleController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const moduleId = req.params.moduleId;
    const updatedData: CreateModuleRequest = req.body;

    // Validate moduleId
    if (!mongoose.Types.ObjectId.isValid(moduleId)) {
      throw new BadRequestError("Invalid module ID format");
    }

    // Validate request body
    if (
      !updatedData.title ||
      !updatedData.duration ||
      !updatedData.lectures ||
      !Array.isArray(updatedData.lectures)
    ) {
      throw new BadRequestError(
        "Missing required fields: title, duration, and lectures array"
      );
    }

    if (updatedData.lectures.length === 0) {
      throw new BadRequestError("At least one lecture is required");
    }

    // Check if module exists
    const existingModule = await CourseModule.findById(moduleId);
    if (!existingModule) {
      throw new NotFoundError("Module not found");
    }

    try {
      // Delete existing lectures for this module
      await CourseLecture.deleteMany({ moduleId: existingModule._id });

      const newLectureIds: mongoose.Types.ObjectId[] = [];

      // Create new lectures
      for (const lectureData of updatedData.lectures) {
        const lecturePayload: any = {
          moduleId: existingModule._id,
          courseId: existingModule.courseId,
          title: lectureData.title.trim(),
          duration: lectureData.duration.trim(),
          type: lectureData.type,
        };

        if (lectureData.videoUrl?.trim()) {
          lecturePayload.videoUrl = lectureData.videoUrl.trim();
        }
        if (lectureData.documentUrl?.trim()) {
          lecturePayload.documentUrl = lectureData.documentUrl.trim();
        }
        if (lectureData.assignmentUrl?.trim()) {
          lecturePayload.assignmentUrl = lectureData.assignmentUrl.trim();
        }

        const newLecture = await CourseLecture.create(lecturePayload);
        newLectureIds.push(newLecture._id);
      }

      // Update the module
      existingModule.title = updatedData.title.trim();
      existingModule.duration = updatedData.duration.trim();
      existingModule.lectures = newLectureIds;
      await existingModule.save();

      // Return updated module with populated lectures
      const result = await CourseModule.findById(existingModule._id).populate({
        path: "lectures",
        model: "Lecture",
        select: "title duration type videoUrl documentUrl assignmentUrl",
      });

      return ApiResponseUtil.success(
        res,
        result,
        "Module updated successfully"
      );
    } catch (error: any) {
      logger.error("Error updating module:", error);

      if (error.name === "ValidationError") {
        const validationErrors = Object.values(error.errors).map(
          (err: any) => err.message
        );
        throw new BadRequestError(
          `Validation error: ${validationErrors.join(", ")}`
        );
      }

      throw new InternalServerError("Failed to update module");
    }
  }
);

const normalizeCategoryForDatabase = (category: string): string => {
  return category
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, "") // Remove special characters except hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
};

const normalizeCategoriesArray = (categories: string[]): string[] => {
  return categories.map(normalizeCategoryForDatabase);
};
