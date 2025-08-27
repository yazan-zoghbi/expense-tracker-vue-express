import { NextFunction, Request, Response } from "express";

export const authLogger = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { method, originalUrl, headers, ip } = req;
  const user = req.body.username;
  const { statusCode } = res;

  console.log(
    `\x1b[33m[Auth]\x1b[0m ${req.method} ${req.originalUrl} - IP: ${ip}, User: ${user}, UA: ${headers["user-agent"]}, Status: ${statusCode}`
  );

  next();
};
