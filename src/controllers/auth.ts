import { RequestHandler } from "express";
import User from "../models/User";
import APIError from "../errors/APIError";
import { BAD_REQUEST, CREATED, OK, UNAUTHORIZED } from "../errors/enums";

const register: RequestHandler = async (req, res) => {
  const user = await User.create(req.body);
  const token = user.createJWT();
  res.status(CREATED).json({ user: { name: user.name }, token });
};

const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new APIError(
      "To log in you must provide email and password",
      BAD_REQUEST
    );
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new APIError("Invalid credentials", UNAUTHORIZED);
  }
  if (!(await user.comparePassword(password))) {
    throw new APIError("Invalid credentials", UNAUTHORIZED);
  }
  const token = user.createJWT();
  res.status(OK).json({ user: { name: user.name }, token });
};

export { register, login };
