const express = require("express");
const router = express.Router();

// controllers
const {
  createProduct,
  getProducts,
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


module.exports = router;
