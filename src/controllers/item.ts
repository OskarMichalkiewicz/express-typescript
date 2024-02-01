import Item from "../models/Item";
import APIError from "../errors/APIError";
import { RequestHandler } from "express";
import { BAD_REQUEST, CREATED, NOT_FOUND, OK } from "../errors/enums";

const create: RequestHandler = async (req, res) => {
  req.body.createdBy = req.user.id;
  const item = await Item.create(req.body);
  res.status(CREATED).json({ item });
};

const get: RequestHandler = async (req, res) => {
  const items = await Item.find({ createdBy: req.user.id }).sort("createdAt");
  res.status(OK).json({ items, count: items.length });
};

const getOne: RequestHandler = async (req, res) => {
  const {
    user: { id },
    params: { id: itemId },
  } = req;

  const item = await Item.findOne({
    _id: itemId,
    createdBy: id,
  });
  if (!item) {
    throw new APIError(`There is no item with id: ${itemId}.`, NOT_FOUND);
  }
  res.status(OK).json({ item });
};

const modify: RequestHandler = async (req, res, next) => {
  const {
    params: { id: itemId },
    user: { id },
    body: { name, description },
  } = req;
  if (!name && !description) {
    throw new APIError("Provide at least one value to change.", BAD_REQUEST);
  }
  const item = await Item.findByIdAndUpdate(
    { _id: itemId, createdBy: id },
    req.body
  );
  if (!item) {
    return next(new APIError(`No items with id: ${id}.`, NOT_FOUND));
  }
  res.status(OK).json(item._id);
};

const remove: RequestHandler = async (req, res, next) => {
  const {
    user: { id },
    params: { id: itemId },
  } = req;

  const item = await Item.findByIdAndDelete({ _id: itemId, createdBy: id });
  if (!item) {
    return next(new APIError(`No items with id: ${itemId}.`, NOT_FOUND));
  }
  res.status(OK).json(itemId);
};

export default { create, get, modify, remove, getOne };
