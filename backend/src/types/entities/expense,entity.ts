import mongoose from "mongoose";

export interface Expense extends Document {
  user: mongoose.Schema.Types.ObjectId;
  amount: number;
  category: string;
  date: Date;
  note: string;
}
