import express from "express";
import { routesFactory } from "./routesFactory";
import { create } from "../controllers/tea";
const router = express.Router();

routesFactory(router, { create });

export default router;
