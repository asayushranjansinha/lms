import { verifyAccessToken } from "@/services/jwt-services";
import { ForbiddenError, UnauthorizedError } from "@/utils/app.error";
import { NextFunction, Request, Response } from "express";

/**
 * Middleware to protect routes - requires valid JWT token
 */
export const protect = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined;

    // Prefer token from Authorization header (fallback for testing)
    if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Else, get token from cookie named "accessToken"
    else if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      throw new UnauthorizedError("Access denied. No token provided.");
    }

    // Verify token
    const decoded = verifyAccessToken(token);

    // Attach user info to request object
    req.user = {
      id: decoded.user.id,
      email: decoded.user.email,
      role: decoded.user.role,
    };

    next();
  } catch (error) {
    next(new UnauthorizedError("Invalid or expired token"));
  }
};

/**
 * Middleware to optionally attach user if a valid token is present.
 * Does not throw on missing/invalid token — proceeds anonymously.
 */
export const attachUserIfExists = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined;

    // Prefer token from Authorization header (fallback for testing)
    if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Else, get token from cookie named "accessToken"
    else if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    if (token) {
      const decoded = verifyAccessToken(token);

      req.user = {
        id: decoded.user.id,
        email: decoded.user.email,
        role: decoded.user.role,
      };
    } else {
      req.user = undefined;
    }
  } catch (error) {
    req.user = undefined;
  } finally {
    next();
  }
};

/**
 * Middleware to restrict access to specific roles
 */
export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new UnauthorizedError("Access denied. Please log in."));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new ForbiddenError("You do not have permission to perform this action")
      );
    }

    next();
  };
};
