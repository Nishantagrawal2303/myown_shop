require("dotenv").config({ path: __dirname + "/.env" });
const mongoose = require("mongoose");
const User = require("./models/User");

const connectDB = require("./config/db");

const fixAdminRole = async () => {
  try {
    await connectDB();

    const user = await User.findOneAndUpdate(
      { email: "nishant@gmail.com" },
      { role: "admin" },
      { new: true }
    );

    if (!user) {
      console.log("❌ User nishant@gmail.com not found in database");
    } else {
      console.log(`✅ Role updated! ${user.email} is now role: ${user.role}`);
    }

    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
};

fixAdminRole();
