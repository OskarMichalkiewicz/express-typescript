import Item from "../models/Item";
import APIError from "../errors/APIError";
import { RequestHandler } from "express";

const create: RequestHandler = async (req, res) => {
  const item = await Item.create(req.body);
  res.status(201).json({ item });
};

const get: RequestHandler = async (req, res) => {
  const items = await Item.find();
  res.status(200).json({ items });
};

const modify: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const item = await Item.findByIdAndUpdate(id, req.body);
  if (!item) {
    return next(new APIError(`No items with id: ${id}`, 404));
  }
  res.status(200).json({ item });
};

const remove: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const item = await Item.findByIdAndDelete(id);
  if (!item) {
    return next(new APIError(`No items with id: ${id}`, 404));
  }
  res.status(200).json({ item });
};

export default { create, get, modify, remove };
