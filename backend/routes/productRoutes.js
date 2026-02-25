const express = require("express");
const router = express.Router();

// controllers
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// middleware
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");


/*
========================
PRODUCT ROUTES
========================
*/

// Public — get all products
router.get("/", getProducts);

// Admin — create product
router.post("/create", protect, adminOnly, createProduct);

// Admin — update product
router.put("/:id", protect, adminOnly, updateProduct);

// Admin — delete product
router.delete("/:id", protect, adminOnly, deleteProduct);


module.exports = router;
