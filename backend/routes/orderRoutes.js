const express = require("express");
const router = express.Router();

const { placeOrder, myOrders } = require("../controllers/orderController");
const { checkoutFromCart } = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");

router.post("/place", protect, placeOrder);
router.get("/myorders", protect, myOrders);
router.post("/checkout", protect, checkoutFromCart);

module.exports = router;
