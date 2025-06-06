import { config } from "@/config/env";
import { User } from "@/models/user.model";
import { clearCookieToken, setCookieToken } from "@/services/cookie-services";
import { generateTokens, verifyRefreshToken } from "@/services/jwt-services";
import { ApiResponseUtil } from "@/utils/api-response";
import { BadRequestError, ConflictError, UnauthorizedError } from "@/utils/app.error";
import { asyncHandler } from "@/utils/async-handler";
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

/**
 * Register User Controller
 */
export const registerUserController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ConflictError("Account with this email already exists");
    }

    // Create new user instance in db
    const newUser = new User({
      name,
      email,
      password,
      termsAccepted: true,
    });

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens({
      email,
      name,
      role: "student",
      id: newUser.id,
    });

    // Update user refresh token
    newUser.refreshToken = refreshToken;

    // Save user to db
    await newUser.save();

    // Set tokens in cookies
    setCookieToken(res, "accessToken", accessToken);
    setCookieToken(res, "refreshToken", refreshToken, 30);

    // Return success response
    return ApiResponseUtil.success(
      res,
      {
        accessToken,
        refreshToken,
        user: {
          name: newUser.name,
          email: newUser.email,
          id: newUser.id,
          role: newUser.role,
        },
      },
      "User registered successfully",
      201
    );
  }
);

/**
 * Login User Controller
 */
export const loginUserController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    // Check if user exists & password matches
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      throw new UnauthorizedError("Invalid email or password");
    }
    // Generate tokens
    const { accessToken, refreshToken } = generateTokens({
      email,
      name: user.name,
      role: user.role,
      id: user.id,
    });

    // Update user refresh token
    user.refreshToken = refreshToken;

    // Save user to db
    await user.save();

    // Set tokens in cookies
    setCookieToken(res, "accessToken", accessToken);
    setCookieToken(res, "refreshToken", refreshToken, 30);

    // Return success response
    return ApiResponseUtil.success(
      res,
      {
        accessToken,
        refreshToken,
        user: {
          name: user.name,
          email: user.email,
          id: user.id,
          role: user.role,
        },
      },
      "Login Successful",
      200
    );
  }
);

/**
 * Logout User Controller
 */
export const logoutUserController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Get user from request

    const user = req.user;

    if (!user) {
      return ApiResponseUtil.success(res, {}, "Logout Successful");
    }

    // Update user refresh token
    const userInstance = await User.findById(user.id);
    if (userInstance) {
      userInstance.refreshToken = null;
      await userInstance.save();
    }

    // Clear tokens from cookies
    clearCookieToken(res, "accessToken");
    clearCookieToken(res, "refreshToken");

    return ApiResponseUtil.success(res, null, "Logout Successful");
  }
);

/**
 * Refresh Token Controller
 */
export const refreshTokenController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Get refresh token from cookies (preferred) or body (fallback)
    const refreshToken =
      req.cookies?.refreshToken || req.body?.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedError("Refresh token not provided");
    }

    try {
      // Verify refresh token
      const payload = verifyRefreshToken(
        refreshToken,
        config.JWT_REFRESH_SECRET
      ) as JwtPayload;

      // Find the user in DB
      const user = await User.findOne({ email: payload.user.email });
      if (!user || user.refreshToken !== refreshToken) {
        throw new UnauthorizedError("Invalid refresh token");
      }

      // Generate new tokens
      const { accessToken, refreshToken: newRefreshToken } = generateTokens({
        email: user.email,
        name: user.name,
        role: user.role,
        id: user.id,
      });

      // Update refresh token in DB
      user.refreshToken = newRefreshToken;
      await user.save();

      // Set new tokens in cookies
      setCookieToken(res, "accessToken", accessToken);
      setCookieToken(res, "refreshToken", newRefreshToken, 30);

      // Respond with new token + user (optional)
      return ApiResponseUtil.success(
        res,
        {
          accessToken,
          refreshToken: newRefreshToken,
          user: {
            name: user.name,
            email: user.email,
            id: user.id,
            role: user.role,
          },
        },
        "Refresh token successful"
      );
    } catch (err) {
      throw new UnauthorizedError("Refresh token expired or invalid");
    }
  }
);
