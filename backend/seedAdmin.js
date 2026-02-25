require("dotenv").config({ path: __dirname + "/.env" });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const connectDB = require("./config/db");

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminExists = await User.findOne({ email: "nishant@gmail.com" });

    if (adminExists) {
      console.log("Admin user already exists");
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("123456", salt);

    const admin = await User.create({
      name: "Nishant Admin",
      email: "nishant@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin user created:", admin.email);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();