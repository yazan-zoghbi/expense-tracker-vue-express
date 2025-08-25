import express from "express";

import { validateDto } from "../middleware/validate.js";
import { ExpenseController } from "@controllers/expense.controller.js";
import { AddExpenseDTO, EditExpenseDTO } from "../types/dto/expense.dto.js";

const expenseRouter = express.Router();

const expenseController = new ExpenseController();

expenseRouter.post("/add", validateDto(AddExpenseDTO), expenseController.add);
expenseRouter.put(
  "/edit/:id",
  validateDto(EditExpenseDTO),
  expenseController.edit
);
expenseRouter.delete("/delete/:id", expenseController.delete);
expenseRouter.get("/get/all", expenseController.getAll);

export default expenseRouter;
