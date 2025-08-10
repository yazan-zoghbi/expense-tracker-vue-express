import "reflect-metadata";
import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class SignupDTO {
  @IsNotEmpty()
  @Type(() => String)
  full_name!: string;

  @IsNotEmpty()
  @Length(5, 20)
  @Type(() => String)
  username!: string;

  @IsNotEmpty()
  @Length(8, 100)
  @Type(() => String)
  password!: string;

  @IsEmail()
  @Type(() => String)
  email!: string;
}

export class LoginDTO {
  @IsNotEmpty()
  @Length(5, 20)
  username!: string;

  @IsNotEmpty()
  @Length(8, 100)
  password!: string;
}
