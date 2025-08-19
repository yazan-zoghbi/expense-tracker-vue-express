import "reflect-metadata";

import { IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";

export class AddExpenseDTO {
  @IsNotEmpty()
  @Type(() => Number)
  amount!: number;

  @IsNotEmpty()
  @Type(() => String)
  category!: string;

  @IsNotEmpty()
  @Type(() => Date)
  date!: Date;

  @Type(() => String)
  note!: string;
}

export class EditExpenseDTO {
  @IsNotEmpty()
  @Type(() => Number)
  amount!: number;

  @IsNotEmpty()
  @Type(() => String)
  category!: string;

  @IsNotEmpty()
  @Type(() => Date)
  date!: Date;

  @Type(() => String)
  note!: string;
}
