import Item from "../models/Item";
import APIError from "../errors/APIError";
import { RequestHandler } from "express";
import { CREATED, NOT_FOUND, OK } from "../errors/enums";

const create: RequestHandler = async (req, res) => {
  const item = await Item.create(req.body);
  res.status(CREATED).json({ item });
};

const get: RequestHandler = async (req, res) => {
  const items = await Item.find();
  res.status(OK).json({ items });
};

const modify: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const item = await Item.findByIdAndUpdate(id, req.body);
  if (!item) {
    return next(new APIError(`No items with id: ${id}`, NOT_FOUND));
  }
  res.status(OK).json({ item });
};

const remove: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const item = await Item.findByIdAndDelete(id);
  if (!item) {
    return next(new APIError(`No items with id: ${id}`, NOT_FOUND));
  }
  res.status(OK).json({ item });
};

export default { create, get, modify, remove };
