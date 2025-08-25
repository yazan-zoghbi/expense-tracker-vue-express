import mongoose from "mongoose";

export interface Expense extends Document {
  user: mongoose.Schema.Types.ObjectId;
  title: string;
  amount: number;
  category: string;
  label: string;
  date: Date;
  note: string;
}
