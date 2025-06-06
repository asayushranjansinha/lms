import { NextFunction, Request, Response } from "express";

/**
 * 
 * @param fn Controller function to be wrapped in try catch block
 * @returns A promise that resolves to the result of the controller function
 */
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
