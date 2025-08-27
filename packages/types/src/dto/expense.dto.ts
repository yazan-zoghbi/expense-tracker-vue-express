import "reflect-metadata";

import { IsEnum, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";
import { ExpenseCategory } from "../domain/ExpenseCategory.enum";

export class AddExpenseDTO {
  @IsNotEmpty()
  @Type(() => String)
  title!: string;

  @IsNotEmpty()
  @Type(() => Number)
  amount!: number;

  @IsNotEmpty()
  @IsEnum(ExpenseCategory)
  category!: ExpenseCategory;

  @IsNotEmpty()
  @Type(() => String)
  label!: string;

  @IsNotEmpty()
  @Type(() => Date)
  date!: Date;

  @Type(() => String)
  note!: string;
}

export class EditExpenseDTO {
  @IsNotEmpty()
  @Type(() => String)
  title!: string;

  @IsNotEmpty()
  @Type(() => Number)
  amount!: number;

  @IsNotEmpty()
  @IsEnum(ExpenseCategory)
  category!: ExpenseCategory;

  @IsNotEmpty()
  @Type(() => Date)
  date!: Date;

  @IsNotEmpty()
  @Type(() => String)
  label!: string;

  @Type(() => String)
  note!: string;
}
