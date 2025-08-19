import { ExpenseModel } from "@models/expense.model";
import { AddExpenseDTO, EditExpenseDTO } from "../types/dto/expense.dto";
import jwt from "jsonwebtoken";
import type { TokenPayload } from "../types/domain/payload";
import { AuthError } from "errors/AuthError";
import mongoose from "mongoose";

export class ExpenseService {
  add = async (access_token: string, dto: AddExpenseDTO) => {
    if (!access_token) throw new AuthError("Token not found!");

    const decode_payload = jwt.decode(access_token) as TokenPayload;

    const expenseData = {
      user: decode_payload._id,
      amount: dto.amount,
      category: dto.category,
      date: dto.date,
      note: dto.note,
    };
    const expense = await ExpenseModel.create(expenseData);
    return expense;
  };

  edit = async (
    expese_id: string,
    access_token: string,
    dto: EditExpenseDTO
  ) => {
    const decode_payload = jwt.decode(access_token) as TokenPayload;

    const expense = await ExpenseModel.findById(expese_id);

    if (!expense) throw new Error("Expense record not found!");

    const expenseData = {
      user: decode_payload._id,
      amount: dto.amount,
      category: dto.category,
      date: dto.date,
      note: dto.note,
    };
    await expense.updateOne(expenseData);

    return expense;
  };

  delete = async (expense_id: string) => {
    const expense = await ExpenseModel.findById(expense_id);

    if (!expense) throw new Error("Expense record not found!");

    return await expense.deleteOne();
  };
}
