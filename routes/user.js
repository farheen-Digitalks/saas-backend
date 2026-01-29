import express from "express";
import {
  createUserHandler,
  deleteUserHandler,
  getUserByIdHandler,
  getUsersHandler,
  loginUserHandler,
  updateUserHandler,
} from "../controllers/user.js";
import { authenticate } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/checkAdmin.js";
const router = express.Router();
router.use(authenticate);

router.get("/", getUsersHandler);
router.post("/create-user", isAdmin, createUserHandler);
router.get("/:id", getUserByIdHandler);
router.put("/:id", updateUserHandler);
router.delete("/:id", deleteUserHandler);
router.post("/login", loginUserHandler);

export default router;
