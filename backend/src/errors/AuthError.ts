import { BaseError } from "../errors/BaseError.js";

export class AuthError extends BaseError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

export class SignupError extends BaseError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}
