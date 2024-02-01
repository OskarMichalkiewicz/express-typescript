import { ErrorRequestHandler } from "express";
import { BAD_REQUEST, CONFLICT, INTERNAL_SERVER_ERROR } from "../errors/enums";
import { Error } from "mongoose";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let errorObject = {
    statusCode: err.statusCode || INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, try again later.",
  };

  if (err instanceof Error.ValidationError) {
    const validationErrors = extractValidationErrors(err);
    errorObject = { statusCode: BAD_REQUEST, msg: validationErrors };
  }
  if (err instanceof Error.CastError) {
    errorObject = { statusCode: BAD_REQUEST, msg: "Invalid ID format." };
  }
  if (isDuplicateKeyError(err)) {
    errorObject = { statusCode: CONFLICT, msg: "Duplicate key violation." };
  }
  const { statusCode, msg } = errorObject;

  return res.status(statusCode).json({ msg });
};

const extractValidationErrors = (
  err: Error.ValidationError
): Record<string, string> => {
  const validationErrors: Record<string, string> = {};
  for (const field in err.errors) {
    if (err.errors.hasOwnProperty(field)) {
      validationErrors[field] = err.errors[field].message;
    }
  }
  return validationErrors;
};

const isDuplicateKeyError = (err: any): boolean => {
  return err.code === 11000 || err.code === 11001;
};

export default errorHandler;
