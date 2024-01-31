import { Handler } from "express";
import { NOT_FOUND } from "../errors/enums";
const notFound: Handler = (req, res) =>
  res.status(NOT_FOUND).send("Route does not exist");

export default notFound;
