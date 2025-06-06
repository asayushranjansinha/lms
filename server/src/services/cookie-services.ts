import { CookieOptions, Response } from "express";
import { NODE_ENV } from "@/config/env";



/**
 * 
 * @param res The express response object
 * @param tokenName token name to be set
 * @param token token to set
 * @param expiresIn expiry time in days 
 */
export const setCookieToken = (
  res: Response,
  tokenName: string,
  token: string,
  expiresIn: number = 7
) => {
  const cookieOptions: CookieOptions = {
    expires: new Date(Date.now() + expiresIn * 24 * 60 * 60 * 1000), // 7 days
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };
  res.cookie(tokenName, token, cookieOptions);
};


/**
 * 
 * @param res The express response object
 * @param tokenName Token name to be cleared
 */
export const clearCookieToken = (res: Response, tokenName: string) => {
  const cookieOptions = {
    expires: new Date(Date.now() - 1),
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: true,
  };
  res.clearCookie(tokenName, cookieOptions);
};