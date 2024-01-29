import { ErrorRequestHandler } from "express";
import APIError from "../errors/APIError";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof APIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res
    .status(500)
    .json({ msg: "Something went wrong, please try again." });
};

export default errorHandler;
