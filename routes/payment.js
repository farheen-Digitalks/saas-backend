import express from "express";
import { authenticate } from "../middlewares/auth.js";
import { createPaymentOrder } from "../controllers/payment.js";
const router = express.Router();

router.post(
    "/create-order",
    authenticate,
    createPaymentOrder
);

export default router;