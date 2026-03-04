const fs = require("fs");
const path = require("path");
const Product = require("../models/Product");

// GET /api/products — supports ?category= filter
const getAllProducts = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/products
const createProduct = async (req, res) => {
  try {
    const { name, price, category, description, stock } = req.body;

    // Validate required fields
    if (!name || price === undefined || !category) {
      return res.status(400).json({
        message: "Required fields missing: name, price, and category are required",
      });
    }

    const productData = {
      name,
      description: description || "",
      price: Number(price),
      category,
      stock: stock ? Number(stock) : 0,
      image: req.file ? req.file.filename : "",
    };

    const product = await Product.create(productData);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /api/products/:id
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const { name, price, category, description, stock } = req.body;

    // If a new image is uploaded, delete the old one
    if (req.file && product.image) {
      const oldImagePath = path.join(__dirname, "../uploads", product.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    const updateData = {
      name: name || product.name,
      description: description !== undefined ? description : product.description,
      price: price !== undefined ? Number(price) : product.price,
      category: category || product.category,
      stock: stock !== undefined ? Number(stock) : product.stock,
      image: req.file ? req.file.filename : product.image,
    };

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete image file if it exists
    if (product.image) {
      const imagePath = path.join(__dirname, "../uploads", product.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};