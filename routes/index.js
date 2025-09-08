import express from "express";
const router = express.Router();

import userRoutes from "./user.js";
import product from "./product.js";

router.use("/users", userRoutes);
router.use("/product", product);

export default router;
