import express from "express";
import { UserController } from "../controllers/user.controller.ts";

const userRouter = express.Router();

const userController = new UserController();

userRouter.post("/signup", userController.create);
userRouter.post("/login", userController.login);
userRouter.get("/refresh", userController.getNewAccessToken);

export default userRouter;
