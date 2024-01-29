import express from "express";
import { routesFactory } from "./routesFactory";
import tea from "../controllers/tea";
const router = express.Router();

routesFactory(router, tea);

export default router;
