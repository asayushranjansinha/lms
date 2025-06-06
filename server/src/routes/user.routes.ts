import { Router } from "express";


import { getUserProfileController, updateUserProfileController } from "@/controllers/user.controllers";
import { protect } from "@/middlewares/auth.middleware";
import { upload } from "@/utils/multer-uploads";

const userRoutes = Router();

userRoutes.get("/profile", protect, getUserProfileController);

userRoutes.put(
  "/profile",
  protect,
  upload.single("profilePicture"),
  updateUserProfileController
);

export { userRoutes };