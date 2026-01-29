import express from "express";
import { createPermissionHandler, deletePermissionHandler, getPermissionByIdHandler, getPermissionsHandler, updatePermissionHandler } from "../controllers/permission.js";
import { authenticate } from "../middlewares/auth.js";
import { paginationMiddleware } from "../middlewares/pagination.js";
import permission from "../models/permission.js";
const router = express.Router();
router.use(authenticate);

router.post("/", paginationMiddleware(permission), createPermissionHandler);
router.get("/", getPermissionsHandler);
router.get("/:id", getPermissionByIdHandler);
router.put("/:id", updatePermissionHandler);
router.delete("/:id", deletePermissionHandler);

export default router;
