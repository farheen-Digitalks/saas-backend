import express from "express";
import {
  createProductHandler,
  deleteProductHandler,
  getProductByIdHandler,
  getProductsHandler,
  updateProductHandler,
} from "../controllers/product.js";
import { authenticate } from "../middlewares/auth.js";
const router = express.Router();
router.use(authenticate);

router.get("/", getProductsHandler);
router.post("/", createProductHandler);
router.get("/:id", getProductByIdHandler);
router.put("/:id", updateProductHandler);
router.delete("/:id", deleteProductHandler);

export default router;
