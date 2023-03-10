import express from "express";
import { addOrderItems } from "../controllers/orderControllers.js";
import { protect } from "../controllers/userControllers.js";

const router = express.Router();

router.route('/').post(protect, addOrderItems);

export default router