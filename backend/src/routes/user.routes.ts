import express from "express";

import { UserController } from "../controllers/user.controller.js";
import { validateDto } from "../middleware/validate.js";
import { LoginDTO, SignupDTO } from "types/dto/user.dto";
import { authLogger } from "@middleware/authLogger.js";

const userRouter = express.Router();

const userController = new UserController();

userRouter.post(
  "/signup",
  authLogger,
  validateDto(SignupDTO),
  userController.create
);
userRouter.post(
  "/login",
  authLogger,
  validateDto(LoginDTO),
  userController.login
);
userRouter.get("/refresh", userController.getNewAccessToken);

export default userRouter;
