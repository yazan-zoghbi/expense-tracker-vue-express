import { ExpenseModel } from "@models/expense.model";
import { AddExpenseDTO, EditExpenseDTO } from "../types/dto/expense.dto";
import jwt from "jsonwebtoken";
import type { TokenPayload } from "../types/domain/payload";
import { AuthError } from "errors/AuthError";

export class ExpenseService {
  add = async (access_token: string, dto: AddExpenseDTO) => {
    if (!access_token) throw new AuthError("Token not found!");

    const decode_payload = jwt.decode(access_token) as TokenPayload;

    const expenseData = {
      user: decode_payload._id,
      title: dto.title,
      amount: dto.amount,
      category: dto.category,
      label: dto.label,
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
    if (!access_token) throw new AuthError("Token not found");

    const decode_payload = jwt.decode(access_token) as TokenPayload;

    const expenseData = {
      user: decode_payload._id,
      title: dto.title,
      amount: dto.amount,
      category: dto.category,
      date: dto.date,
      note: dto.note,
    };

    const updatedExpense = await ExpenseModel.findByIdAndUpdate(
      expese_id,
      expenseData,
      { new: true }
    );

    if (!updatedExpense) throw new Error("Expense record not found.");

    return updatedExpense;
  };

  delete = async (expense_id: string) => {
    const expense = await ExpenseModel.findById(expense_id);

    if (!expense) throw new Error("Expense record not found!");

    return await expense.deleteOne();
  };

  getAll = async (access_token: string) => {
    if (!access_token) throw new AuthError("Token not found");

    const decode_payload = jwt.decode(access_token) as TokenPayload;

    const expensesList = await ExpenseModel.find({ user: decode_payload._id });

    return expensesList;
  };
}
