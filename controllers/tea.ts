import asyncWrapper from "../middlewares/async";
import Tea from "../models/Tea";
import APIError from "../errors/APIError";

const create = asyncWrapper(async (req, res) => {
  const tea = await Tea.create(req.body);
  res.status(201).json({ tea });
});

const get = asyncWrapper(async (req, res) => {
  const teas = await Tea.find();
  res.status(200).json({ teas });
});

const modify = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const tea = await Tea.findByIdAndUpdate(id, req.body);
  if (!tea) {
    return next(new APIError(`No items with id: ${id}`, 404));
  }
  res.status(200).json({ tea });
});

const remove = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const tea = await Tea.findByIdAndDelete(id);
  if (!tea) {
    return next(new APIError(`No items with id: ${id}`, 404));
  }
  res.status(200).json({ tea });
});

export default { create, get, modify, remove };
