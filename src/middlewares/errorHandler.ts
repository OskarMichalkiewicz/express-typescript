import { ErrorRequestHandler } from "express";
import APIError from "../errors/APIError";
import { INTERNAL_SERVER_ERROR } from "../errors/enums";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof APIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(INTERNAL_SERVER_ERROR).json({ msg: err.message });
};

export default errorHandler;
