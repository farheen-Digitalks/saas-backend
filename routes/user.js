import express from "express";
import {
  createUserHandler,
  deleteUserHandler,
  getUserByIdHandler,
  getUsersHandler,
  loginUserHandler,
  updateUserHandler,
} from "../controllers/user.js";
const router = express.Router();

router.get("/", getUsersHandler);
router.post("/", createUserHandler);
router.get("/:id", getUserByIdHandler);
router.put("/:id", updateUserHandler);
router.delete("/:id", deleteUserHandler);
router.post("/login", loginUserHandler);

export default router;
