import { Request, Response } from "express";
import Tea from "../models/Tea";

export const create = async (req: Request, res: Response) => {
  try {
    const tea = await Tea.create(req.body);
    res.status(201).json({ tea });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
