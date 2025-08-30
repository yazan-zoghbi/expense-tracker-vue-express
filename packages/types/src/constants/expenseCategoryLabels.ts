import { ExpenseCategory } from "../domain/ExpenseCategory.enum";

export const ExpenseCategoryLabels: Record<ExpenseCategory, string> = {
  [ExpenseCategory.FOOD]: "Food & Dining",
  [ExpenseCategory.TRANSPORTATION]: "Transportation",
  [ExpenseCategory.UTILITIES]: "Utilities",
  [ExpenseCategory.ENTERTAINMENT]: "Entertainment",
  [ExpenseCategory.HEALTHCARE]: "Healthcare",
  [ExpenseCategory.EDUCATION]: "Education",
  [ExpenseCategory.HOUSING]: "Housing",
  [ExpenseCategory.PERSONAL]: "Personal Care",
  [ExpenseCategory.SAVINGS]: "Savings & Investments",
  [ExpenseCategory.OTHER]: "Other",
};
