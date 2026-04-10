import express from "express";
import { loginUserHandler } from "../controllers/user.js";
const router = express.Router();

router.post("/login", loginUserHandler);

export default router;