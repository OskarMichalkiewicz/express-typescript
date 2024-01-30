import express from "express";
import { routesFactory } from "./routesFactory";
import item from "../controllers/item";
const router = express.Router();

routesFactory(router, item);

export default router;
