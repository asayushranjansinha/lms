import { JwtPayload, sign, verify } from "jsonwebtoken";
import { logger } from "@/config/logger";
import { config } from "@/config/env";

interface TokenPayload {
  id:string;
  name: string;
  email: string;
  role: string;
}

/**
 * Generates access and refresh JWT tokens for a given user payload.
 *
 * @param user - The payload containing user information to include in the tokens.
 * @returns An object containing the generated `accessToken` and `refreshToken`.
 * @throws Will throw an error if token generation fails.
 */
export const generateTokens = (user: TokenPayload) => {
  try {
    const accessToken = sign({ user }, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRE as any,
    });
    const refreshToken = sign({ user }, config.JWT_REFRESH_SECRET, {
      expiresIn: config.JWT_REFRESH_EXPIRE as any,
    });
    return { accessToken, refreshToken };
  } catch (error) {
    logger.error(`Failed to generate tokens: ${error}`);
    throw error;
  }
};

/**
 * Verifies a JWT and returns the decoded payload.
 *
 * @param token - The JWT to verify.
 * @param secret - The secret key used to verify the token.
 * @returns The decoded token payload if verification is successful.
 * @throws Will throw an error if the token is invalid or expired.
 */
export const verifyAccessToken = <TokenPayload>(
  token: string,
): JwtPayload => {
  return verify(token, config.JWT_SECRET) as JwtPayload;
};

/**
 * Verifies a JWT and returns the decoded payload.
 *
 * @param token - The JWT to verify.
 * @param secret - The secret key used to verify the token.
 * @returns The decoded token payload if verification is successful.
 * @throws Will throw an error if the token is invalid or expired.
 */
export const verifyRefreshToken = <TokenPayload>(
  token: string,
  secret: string
): TokenPayload => {
  return verify(token, config.JWT_REFRESH_SECRET) as TokenPayload;
};
