import { ExpenseCategory, ExpenseCategoryLabels } from "types";

export const ExpenseCategoryOptions = Object.entries(ExpenseCategoryLabels).map(
  ([key, label]) => ({
    value: key as ExpenseCategory,
    label,
  })
);
