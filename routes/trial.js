import express from "express";
import { createTrialRequest, getRequests } from "../controllers/trialRequest.js";
import { authenticate } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/checkAdmin.js";
const router = express.Router();
// router.use(authenticate);

router.get("/", authenticate, isAdmin, getRequests);
router.post("/create-trial", createTrialRequest);

export default router;