import jwt from "jsonwebtoken";
import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";
import path, { dirname } from "path";
import type { User } from "../types/entities/user.entity.ts";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../config/.dev.env") });

const userSchema = new Schema<User>(
  {
    full_name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.methods.generateAccessToken = function () {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret) {
    throw new Error("ACCESS_TOKEN_SECRET is not defined in environment");
  }

  return jwt.sign(
    {
      _id: this._id,
      full_name: this.full_name,
      username: this.username,
      email: this.email,
    },
    secret,
    { expiresIn: "1h" }
  );
};

userSchema.methods.generateRefreshToken = function () {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret) {
    throw new Error("ACCESS_TOKEN_SECRET is not defined in environment");
  }

  return jwt.sign(
    {
      _id: this._id,
      full_name: this.full_name,
      username: this.username,
      email: this.email,
    },
    secret,
    { expiresIn: "7d" }
  );
};

export const UserModel = mongoose.model<User>("User", userSchema);
