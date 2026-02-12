const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
      },
    ],

    totalPrice: Number,

    paymentMethod: {
      type: String,
      default: "COD",
    },

    status: {
  type: String,
  enum: ["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"],
  default: "PENDING",
},

  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
