import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "@/config/env";
// Cloudinary config
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

/**
 * Uploads a file (buffer) to Cloudinary
 */
export const uploadImageToCloudinary = async (
  fileBuffer: Buffer,
  folder: string = "uploads"
): Promise<{ url: string; public_id: string }> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        if (!result) {
          return reject(new Error("No result returned from Cloudinary."));
        }
        resolve({ url: result.secure_url, public_id: result.public_id });
      }
    );

    // Convert buffer to stream
    const readableStream = Readable.from(fileBuffer);
    readableStream.pipe(uploadStream);
  });
};

/**
 * Deletes an image from Cloudinary by public_id
 */
export const deleteImageFromCloudinary = async (
  publicId: string
): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw new Error("Failed to delete image from Cloudinary");
  }
};
