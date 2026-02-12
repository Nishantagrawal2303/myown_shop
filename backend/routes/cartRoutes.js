const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  removeItem,
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

router.post("/add", protect, addToCart);
router.get("/", protect, getCart);
router.delete("/remove/:id", protect, removeItem);

module.exports = router;
