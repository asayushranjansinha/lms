import { Router } from "express";

import {
  addCourseModuleController,
  createCourseController,
  deleteCourseByIdController,
  getCourseByIdController,
  getCourseModuleByIdController,
  getCourseModulesController,
  searchCoursesController,
  updateCourseByIdController,
  updateCourseModuleController,
} from "@/controllers/course.controllers";
import { attachUserIfExists, protect } from "@/middlewares/auth.middleware";

const courseRoutes = Router();

courseRoutes.get("/search", attachUserIfExists, searchCoursesController);
courseRoutes.get(
  "/:id/module/:moduleId",
  attachUserIfExists,
  getCourseModuleByIdController
);
courseRoutes.get(
  "/:id/modules",
  attachUserIfExists,
  getCourseModulesController
);
courseRoutes.get("/:id", attachUserIfExists, getCourseByIdController);

courseRoutes.post("/create", protect, createCourseController);
courseRoutes.post("/:id/module", protect, addCourseModuleController);

courseRoutes.put(
  "/:id/module/:moduleId",
  protect,
  updateCourseModuleController
);
courseRoutes.put("/:id", protect, updateCourseByIdController);

courseRoutes.delete("/:id", protect, deleteCourseByIdController);

export { courseRoutes };
