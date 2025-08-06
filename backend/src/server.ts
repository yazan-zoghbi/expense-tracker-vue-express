import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { dbConnect } from "./config/db.config.ts";

import userRouter from "./routes/user.routes.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "./config/.dev.env") });

const app = express();
const port = process.env.PORT;

const db_url =
  process.env.DB_URL || "mongodb://localhost:27017/expense_tracker";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/auth", userRouter);

(async () => {
  await dbConnect(db_url);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})();
