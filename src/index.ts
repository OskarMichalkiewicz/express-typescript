import "express-async-errors";
import dotenv from "dotenv";
import express, { Application } from "express";
import mongoose from "mongoose";
import item from "./routes/item";
import auth from "./routes/auth";
import errorHandler from "./middlewares/errorHandler";
import notFound from "./middlewares/notFound";
import authMiddleware from "./middlewares/auth";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
