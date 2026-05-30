import express from "express";
import { createPlanHandler, deletePlanHandler, getPlanByIdHandler, updatePlanHandler } from "../controllers/plans.js";
import { authenticate } from "../middlewares/auth.js";
const router = express.Router();
router.use(authenticate);

router.post("/", createPlanHandler);
router.get("/", getPlanByIdHandler);
router.get("/:id", getPlanByIdHandler);
router.put("/:id", updatePlanHandler);
router.delete("/:id", deletePlanHandler);

export default router;