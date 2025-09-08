import Product from "../models/product.js";

export const createProductHandler = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    const product = await Product(req.body);
    return res
      .status(201)
      .json({ message: "Product added successfully", product });
  } catch (error) {
    return res.status(500).json({ message: "Error adding product" });
  }
};

export const getProductsHandler = async (req, res) => {
  try {
    const product = await Product.find();
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching products" });
  }
};

export const getProductByIdHandler = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: "Product not found" });
  }
};

export const updateProductHandler = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (product) {
      return res
        .status(200)
        .json({ message: "product updated successfully", user });
    } else {
      return res.status(404).json({ message: "product not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProductHandler = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (usproducter) {
      return res.status(200).json({ message: "product deleted successfully" });
    } else {
      return res.status(404).json({ message: "product not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
