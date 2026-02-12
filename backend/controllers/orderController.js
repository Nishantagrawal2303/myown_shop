const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// PLACE ORDER
exports.placeOrder = async (req, res) => {
  try {
    const { products, totalPrice, paymentMethod } = req.body;

    const order = await Order.create({
      user: req.user._id,
      products,
      totalPrice,
      paymentMethod,
    });

    res.status(201).json({
      message: "Order Placed Successfully",
      order,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// USER ORDERS
exports.myOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.json(orders);
};
// CHECKOUT FROM CART
exports.checkoutFromCart = async (req, res) => {
  try {
    const cart = await Cart
      .findOne({ user: req.user._id })
      .populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let total = 0;

    const orderProducts = cart.items.map((item) => {
      total += item.product.price * item.quantity;

      return {
        product: item.product._id,
        quantity: item.quantity,
      };
    });

    const order = await Order.create({
      user: req.user._id,
      products: orderProducts,
      totalPrice: total,
      paymentMethod: req.body.paymentMethod || "UPI",
      status: "PENDING",
    });

    // ❌ REMOVE CART CLEAR FROM HERE
    // cart.items = [];
    // await cart.save();

    res.json({
      message: "Order created — proceed to payment",
      order,
      total
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
