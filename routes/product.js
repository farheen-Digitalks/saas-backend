import express from "express";
import {
  createProductHandler,
  deleteProductHandler,
  getProductByIdHandler,
  getProductsHandler,
  updateProductHandler,
} from "../controllers/product.js";
import { authenticate } from "../utils/authentication.js";
const router = express.Router();

router.get("/", authenticate, getProductsHandler);
router.post("/", authenticate, createProductHandler);
router.get("/:id", authenticate, getProductByIdHandler);
router.put("/:id", authenticate, updateProductHandler);
router.delete("/:id", authenticate, deleteProductHandler);

export default router;
