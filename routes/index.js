import express from "express";
const router = express.Router();

import userRoutes from "./user.js";
import product from "./product.js";
import platformUserRoutes from "./platformUser.js";
import permissionRoutes from "./permission.js";
import roleRoutes from "./role.js";
import trialRoutes from './trial.js';

router.use("/users", userRoutes);
router.use("/product", product);
router.use("/platformUser", platformUserRoutes);
router.use("/permission", permissionRoutes);
router.use("/role", roleRoutes);
router.use("/trial", trialRoutes);

export default router;
