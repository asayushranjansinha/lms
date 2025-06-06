import { uploadImageToCloudinary } from "@/config/cloudinary";
import { logger } from "@/config/logger";
import { User } from "@/models/user.model";
import { ApiResponseUtil } from "@/utils/api-response";
import { UnauthorizedError } from "@/utils/app.error";
import { asyncHandler } from "@/utils/async-handler";
import { NextFunction, Request, Response } from "express";
import fs from "fs";
/**
 * Get User Profile Controller
 */
export const getUserProfileController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Get user from database
    const user = await User.findById(req.user?.id);
    if (!user) {
      throw new UnauthorizedError("Please log in to continue");
    }

    // Return user profile
    return ApiResponseUtil.success(
      res,
      {
        user,
      },
      "User profile fetched successfully"
    );
  }
);



/**
 * Update User Profile Controller
 */

export const updateUserProfileController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, bio, website, location, gender, dateOfBirth, phoneNumber } = req.body;

    const user = await User.findById(req.user?.id);
    if (!user) {
      throw new UnauthorizedError("Please log in to continue");
    }

    // ✅ Upload profile picture to Cloudinary
    if (req.file) {
      try {
        // Read the file from disk (since you're using diskStorage)
        const fileBuffer = fs.readFileSync(req.file.path);
        
        const uploadResult = await uploadImageToCloudinary(
          fileBuffer,
          "user_profiles"
        );
        
        user.profilePicture = uploadResult.url; // Save Cloudinary URL
        
        // Delete the local file after successful upload
        fs.unlinkSync(req.file.path);
      } catch (uploadError) {
        logger.error("Cloudinary upload error:", uploadError);
        // Clean up the local file if upload failed
        if (req.file?.path) fs.unlinkSync(req.file.path);
        return res.status(500).json({
          message: "Failed to upload profile picture",
        });
      }
    }

    // Update other user fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.bio = bio || user.bio;
    user.website = website || user.website;
    user.location = location || user.location;
    user.gender = gender || user.gender;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;
    user.phoneNumber = phoneNumber || user.phoneNumber;

    await user.save();

    return ApiResponseUtil.success(
      res,
      { user },
      "User profile updated successfully"
    );
  }
);


