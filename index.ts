import express, { Application } from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connect";
import tea from "./routes/tea";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/tea", tea);

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};
start();
