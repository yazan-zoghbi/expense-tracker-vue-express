import type { Request, Response, NextFunction } from "express";
import { BaseError } from "../errors/BaseError.js";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err instanceof BaseError ? err.statusCode : 500;
  const message = err.message || "Internal Server Error";

  console.error(`[Error] ${req.method} ${req.url} - ${message}`);

  res.status(statusCode).json({
    success: false,
    message,
  });
};
