import express from "express";

import { UserController } from "../controllers/user.controller.js";
import { validateDto } from "../middleware/validate.js";
import { LoginDTO, SignupDTO } from "types/dto/user.dto";

const userRouter = express.Router();

const userController = new UserController();

userRouter.post("/signup", validateDto(SignupDTO), userController.create);
userRouter.post("/login", validateDto(LoginDTO), userController.login);
userRouter.get("/refresh", userController.getNewAccessToken);

export default userRouter;
