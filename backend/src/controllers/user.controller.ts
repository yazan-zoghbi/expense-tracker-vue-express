import type { NextFunction, Request, Response } from "express";
import type { LoginDTO, SignupDTO } from "../types/dto/user.dto.ts";
import { UserServices } from "../services/user.service.js";
import type {
  ApiResponse,
  BaseResponse,
  LoginResponse,
  RefreshToken,
} from "../types/responses/api.response.ts";
import type { User } from "../types/entities/user.entity.ts";

const userService = new UserServices();

export class UserController {
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = req.body as SignupDTO;

      const user = await userService.signup(dto);

      const response: ApiResponse<User> = {
        success: true,
        message: "Your account has been created!",
        data: user,
      };

      return res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = req.body as LoginDTO;

      const loggedUser = await userService.login(dto);

      const { access_token, refresh_token } = loggedUser;

      res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        secure: true, // HTTPS in production
        sameSite: "none", // or "None" for cross-origin with HTTPS
        path: "/", // or more scoped path if you prefer
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.cookie("access_token", access_token, {
        httpOnly: true,
        secure: true, // HTTPS in production
        sameSite: "none", // or "None" for cross-origin with HTTPS
        path: "/", // or more scoped path if you prefer
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });

      const response: LoginResponse = {
        success: true,
        message: "You logged in successfully",
        tokens: loggedUser,
      };

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  getNewAccessToken = async (req: Request, res: Response) => {
    const refresh_token = req.cookies.refresh_token;

    if (!refresh_token) {
      const response: BaseResponse = {
        success: false,
        message: "Refresh token missing from cookies.",
      };
      return res.status(401).json(response);
    }

    const access_token = await userService.refreshAccessToken(refresh_token);

    const response: RefreshToken = {
      success: true,
      message: "New access token generated!",
      access_token: access_token,
    };

    return res.status(200).json(response);
  };
}
