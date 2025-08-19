import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import type { LoginDTO, SignupDTO } from "../types/dto/user.dto.ts";
import type { User } from "../types/entities/user.entity.ts";
import type { TokenPayload } from "../types/domain/payload.ts";
import { AuthError } from "../errors/AuthError.js";
import { UserModel } from "../models/user.model.js";

export class UserServices {
  signup = async (dto: SignupDTO): Promise<User> => {
    const saltRounds = 5;
    const hashedPassword = bcrypt.hashSync(dto.password, saltRounds);

    const userData = {
      full_name: dto.full_name,
      username: dto.username,
      password: hashedPassword,
      email: dto.email,
    };

    const user = await UserModel.create(userData);

    if (!user) {
      throw new AuthError(
        "Signup failed due to invalid data. Please review your input and try again."
      );
    }

    return user;
  };

  login = async (dto: LoginDTO) => {
    const user = (await UserModel.findOne({ username: dto.username })) as User;

    if (!user) {
      throw new AuthError("Invalid username or password");
    }

    const isPasswordValid = bcrypt.compareSync(dto.password, user.password);

    if (!isPasswordValid) {
      throw new AuthError("Invalid username or password");
    }

    return {
      access_token: user.generateAccessToken(),
      refresh_token: user.generateRefreshToken(),
    };
  };

  refreshAccessToken = async (token: string) => {
    const decode_payload = jwt.decode(token) as TokenPayload;

    const user = await UserModel.findById(decode_payload?._id);

    if (!user) throw new Error("User not found!");

    return user.generateAccessToken();
  };
}
