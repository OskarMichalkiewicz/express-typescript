import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import APIError from "../errors/APIError";
import { UNAUTHORIZED } from "../errors/enums";

interface ICustomRequest extends Request {
  user: { id: string; name: string };
}

interface TokenPayload {
  id: string;
  name: string;
}

const auth = async (req: ICustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new APIError("Authentication invalid", UNAUTHORIZED);
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET || ""
    ) as TokenPayload;

    req.user = {
      id: payload.id,
      name: payload.name,
    };
    next();
  } catch (error) {
    throw new APIError("Authentication invalid", UNAUTHORIZED);
  }
};

module.exports = auth;
