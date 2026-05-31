import express from "express";
import { activateSubscriptionHandler, createSubscriptionHandler, getCompanySubscriptionHandler } from "../controllers/subscription.js";
const router = express.Router();

router.post("/", createSubscriptionHandler);

router.get(
    "/company/:companyId",
    getCompanySubscriptionHandler
);

router.patch(
    "/activate/:id",
    activateSubscriptionHandler
);

export default router;