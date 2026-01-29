import express from "express";
import {
  createRoleHandler,
  deleteRoleHandler,
  getRoleByIdHandler,
  getRolesHandler,
  updateRoleHandler,
} from "../controllers/role.js";
import { authenticate } from "../middlewares/auth.js";
import { paginationMiddleware } from "../middlewares/pagination.js";
import role from "../models/role.js";
const router = express.Router();
router.use(authenticate);

router.get(
  "/",
  paginationMiddleware(role, { populate: "permissions" }),
  getRolesHandler,
);
router.post("/", createRoleHandler);
router.get("/:id", getRoleByIdHandler);
router.put("/:id", updateRoleHandler);
router.delete("/:id", deleteRoleHandler);

export default router;
