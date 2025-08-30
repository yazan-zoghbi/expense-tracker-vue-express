import { ExpenseCategory } from "../domain/ExpenseCategory.enum";

export interface ExpenseFormData {
  title: string;
  amount: number;
  category: ExpenseCategory | "";
  label: string;
  date: string;
  note: string;
}
