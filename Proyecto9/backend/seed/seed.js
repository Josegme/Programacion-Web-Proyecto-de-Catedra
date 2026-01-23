require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Hero = require("../models/hero.model");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

async function run() {
  const mongoUri =
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/proyecto9db";
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to", mongoUri);

  const dataPath = path.join(__dirname, "..", "..", "data", "heroes.json");
  if (!fs.existsSync(dataPath)) {
    console.error("data/heroes.json not found at", dataPath);
    process.exit(1);
  }

  const raw = fs.readFileSync(dataPath, "utf8");
  let arr = [];
  try {
    arr = JSON.parse(raw);
  } catch (e) {
    console.error("Invalid JSON", e);
    process.exit(1);
  }

  // If JSON contains nested structure (like array inside array), flatten
  if (arr.length === 1 && Array.isArray(arr[0])) arr = arr[0];

  await Hero.deleteMany({});
  const res = await Hero.insertMany(arr);
  console.log("Inserted", res.length, "heroes");

  // Create an admin user for testing if it doesn't exist
  try {
    const adminEmail = process.env.SEED_ADMIN_EMAIL || "admin@example.com";
    const adminPwd = process.env.SEED_ADMIN_PWD || "admin123";
    const existing = await User.findOne({ email: adminEmail });
    if (!existing) {
      const hash = await bcrypt.hash(adminPwd, 10);
      await User.create({
        email: adminEmail,
        passwordHash: hash,
        role: "admin",
      });
      console.log(
        `Created admin user ${adminEmail} (password from SEED_ADMIN_PWD or default).`
      );
    } else {
      console.log(`Admin user ${adminEmail} already exists.`);
    }
  } catch (err) {
    console.error("Failed to create admin user", err);
  }
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
