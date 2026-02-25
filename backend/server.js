// ✅ FORCE dotenv correct path (MOST IMPORTANT)
require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const connectDB = require("./config/db");
const User = require("./models/User");

// routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const paymentRoutes = require("./routes/paymentRoutes");


// ✅ connect DB after env load
connectDB();

// ✅ Auto-seed admin account (runs once on startup)
const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: "admin" });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);
      await User.create({
        name: "Admin",
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        role: "admin",
      });
      console.log("✅ Admin account created:", process.env.ADMIN_EMAIL);
    } else {
      console.log("ℹ️  Admin account already exists. Skipping seed.");
    }
  } catch (err) {
    console.error("❌ Admin seed failed:", err.message);
  }
};

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

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await seedAdmin(); // ✅ seed admin after server starts
});
