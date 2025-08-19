import { ExpenseService } from "@services/expense.service";
import type { AddExpenseDTO, EditExpenseDTO } from "../types/dto/expense.dto";
import type { NextFunction, Request, Response } from "express";
import { Expense } from "../types/entities/expense,entity";
import { ApiResponse, BaseResponse } from "../types/responses/api.response";

const expenseService = new ExpenseService();

export class ExpenseController {
  add = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = req.body as AddExpenseDTO;

      const access_token = req.cookies.access_token;
      const expense = await expenseService.add(access_token, dto);

      const response: ApiResponse<Expense> = {
        success: true,
        message: "Your expense has been added!",
        data: expense,
      };
      return res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  edit = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = req.body as EditExpenseDTO;
      const access_token = req.cookies.access_token;
      const expense_id = req.params.id;

      const expense = await expenseService.edit(expense_id, access_token, dto);

      const response: ApiResponse<Expense> = {
        success: true,
        message: "Your expense has been updated!",
        data: expense,
      };
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const expense_id = req.params.id;

      await expenseService.delete(expense_id);

      const response: BaseResponse = {
        success: true,
        message: "Your expense has been deleted!",
      };
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}
