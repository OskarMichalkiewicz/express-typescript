import "express-async-errors";
import dotenv from "dotenv";

import helmet from "helmet";
import cors from "cors";
import xss from "./middlewares/xss";
import rateLimit from "express-rate-limit";
import errorHandler from "./middlewares/errorHandler";
import notFound from "./middlewares/notFound";
import authMiddleware from "./middlewares/auth";

import item from "./routes/item";
import auth from "./routes/auth";

import express, { Application } from "express";
import mongoose from "mongoose";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("trust proxy", 1);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());

app.use("/api/auth", auth);

app.use(authMiddleware);
app.use("/api/item", item);
app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URI || "");
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};
start();
