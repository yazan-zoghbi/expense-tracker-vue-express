import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import type { Expense } from "../types/entities/expense,entity.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../config/.dev.env") });

const expenseSchema = new Schema<Expense>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    label: { type: String, required: true },
    date: { type: Date, required: true },
    note: { type: String, required: false },
  },
  { timestamps: true }
);

export const ExpenseModel = mongoose.model<Expense>("Expense", expenseSchema);
