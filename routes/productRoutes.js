const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { protect, managerOrAdmin } = require("../middleware/authMiddleware");

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp/;
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());
  const mime = allowed.test(file.mimetype);
  ext && mime ? cb(null, true) : cb(new Error("Only image files are allowed"));
};

const upload = multer({ storage, fileFilter });

// Public — anyone can view
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Admin or Manager — can manage products
router.post("/", protect, managerOrAdmin, upload.single("image"), createProduct);
router.put("/:id", protect, managerOrAdmin, upload.single("image"), updateProduct);
router.delete("/:id", protect, managerOrAdmin, deleteProduct);

module.exports = router;