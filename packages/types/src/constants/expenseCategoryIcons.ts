import { ExpenseCategory } from "../domain/ExpenseCategory.enum";

export const ExpenseCategoryIcons: Record<ExpenseCategory, string> = {
  [ExpenseCategory.FOOD]: "mdi-silverware-fork-knife",
  [ExpenseCategory.TRANSPORTATION]: "mdi-bus",
  [ExpenseCategory.UTILITIES]: "mdi-flash",
  [ExpenseCategory.ENTERTAINMENT]: "mdi-movie-open",
  [ExpenseCategory.HEALTHCARE]: "mdi-hospital",
  [ExpenseCategory.EDUCATION]: "mdi-school",
  [ExpenseCategory.HOUSING]: "mdi-home",
  [ExpenseCategory.PERSONAL]: "mdi-account",
  [ExpenseCategory.SAVINGS]: "mdi-bank",
  [ExpenseCategory.OTHER]: "mdi-dots-horizontal",
};
