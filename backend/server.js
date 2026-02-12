// ✅ FORCE dotenv correct path (MOST IMPORTANT)
require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

// routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const paymentRoutes = require("./routes/paymentRoutes");


// ✅ connect DB after env load
connectDB();

const app = express();

app.use(express.json());
app.use(cors());


// routes mount
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payment", paymentRoutes);


// health route
app.get("/", (req, res) => {
  res.send("Sanawad Shop Backend Running 🚀");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
