console.log("BACKEND KEY:", process.env.RAZORPAY_KEY);

const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");
const Cart = require("../models/Cart");


// ✅ ENV names — FIXED
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;   // ✅ get from frontend

    const razorpayOrder = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
    });

    // ✅ find latest pending order
    const order = await Order.findOne({
      user: req.user._id,
      status: "PENDING",
    }).sort({ createdAt: -1 });

    if (order) {
      order.razorpayOrderId = razorpayOrder.id;
      await order.save();
    }

    res.json(razorpayOrder);

  } catch (err) {
    console.error("Razorpay error:", err);
    res.status(500).json({ message: err.message });
  }
};


// =========================
// VERIFY PAYMENT
// =========================

exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return res.status(400).json({ success: false });
    }

    // ✅ find order
    const order = await Order.findOne({
      razorpayOrderId: razorpay_order_id,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // ✅ update order
    order.status = "PAID";
    order.paymentId = razorpay_payment_id;
    await order.save();

    // ✅ clear cart
    const cart = await Cart.findOne({ user: order.user });
    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.json({
      success: true,
      message: "Payment verified & order updated",
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
