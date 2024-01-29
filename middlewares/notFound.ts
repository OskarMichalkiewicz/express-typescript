import { Handler } from "express";
const notFound: Handler = (req, res) =>
  res.status(404).send("Route does not exist");

export default notFound;
