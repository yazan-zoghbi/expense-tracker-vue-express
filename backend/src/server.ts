import "reflect-metadata";
import "module-alias/register.js";
import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";

import { dbConnect } from "./config/db.config.js";
import userRouter from "./routes/user.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import expenseRouter from "@routes/expense.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "./config/.dev.env") });

const app = express();
const port = process.env?.PORT;

const db_url =
  process.env.DB_URL || "mongodb://localhost:27017/expense_tracker";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

app.use("/auth", userRouter);
app.use("/expense", expenseRouter);

app.use(errorHandler);

(async () => {
  await dbConnect(db_url);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})();
