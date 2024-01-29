import express, { Application } from "express";
import dotenv from "dotenv";
import tea from "./routes/tea";
import mongoose from "mongoose";
import notFound from "./middlewares/notFound";
import errorHandler from "./middlewares/errorHandler";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/tea", tea);

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
