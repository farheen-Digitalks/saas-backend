import express from "express";
const router = express.Router();

import authRoutes from "./auth.js";
import userRoutes from "./user.js";
import product from "./product.js";
import platformUserRoutes from "./platformUser.js";
import permissionRoutes from "./permission.js";
import roleRoutes from "./role.js";
import trialRoutes from "./trial.js";
import planRoutes from "./p"

router.use("/auth", authRoutes); //user login route
router.use("/users", userRoutes);
router.use("/product", product);
router.use("/platformUser", platformUserRoutes); //platform user
router.use("/permission", permissionRoutes);
router.use("/role", roleRoutes);
router.use("/trial", trialRoutes);

export default router;
