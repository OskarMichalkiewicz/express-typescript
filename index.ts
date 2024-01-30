import express, { Application } from "express";
import dotenv from "dotenv";
import item from "./routes/item";
import mongoose from "mongoose";
import notFound from "./middlewares/notFound";
import errorHandler from "./middlewares/errorHandler";
import "express-async-errors";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
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
