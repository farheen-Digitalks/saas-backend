import express from "express";
import { register } from "../controllers/auth.js";
import {
  getPlatformUsersHandler,
  getUserByIdHandler,
} from "../controllers/platformUser.js";
import { authenticate } from "../middlewares/auth.js";
import { paginationMiddleware } from "../middlewares/pagination.js";
import PlatformUser from "../models/platformUser.js";
import { loginUserHandler } from "../controllers/user.js";
const router = express.Router();

router.get(
  "/",
  authenticate,
  paginationMiddleware(PlatformUser, {
    populate: { path: "role", populate: { path: "permissions" } },
  }),
  getPlatformUsersHandler,
);
router.post("/register", register);
router.get("/:id", getUserByIdHandler);
router.post("/login", loginUserHandler);
// router.post("/logout", logout);

export default router;
