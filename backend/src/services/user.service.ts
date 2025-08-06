import { UserModel } from "../models/user.model.ts";
import bcrypt from "bcrypt";
import type { LoginDTO, SignupDTO } from "../types/dto/user.dto.ts";
import type { User } from "../types/entities/user.entity.ts";
import jwt from "jsonwebtoken";
import type { TokenPayload } from "../types/domain/payload.ts";

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

    return user;
  };

  login = async (dto: LoginDTO) => {
    const user = (await UserModel.findOne({ username: dto.username })) as User;

    if (!user) throw new Error("User not found!");

    const isPasswordValid = bcrypt.compareSync(dto.password, user.password);

    if (!isPasswordValid)
      throw new Error("Check your username or password and try again!");

    return {
      access_token: user.generateAccessToken(),
      refresh_token: user.generateRefreshToken(),
    };
  };

  refreshAccessToken = async (token: string) => {
    const decode_payload = jwt.decode(token) as TokenPayload;

    console.log(decode_payload);

    const user = await UserModel.findById(decode_payload?._id);

    if (!user) throw new Error("User not found!");

    return user.generateAccessToken();
  };
}
