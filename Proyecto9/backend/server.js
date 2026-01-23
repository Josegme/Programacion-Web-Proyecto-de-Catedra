require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
// aumentar límite para aceptar imágenes en base64 desde formularios
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
const authRoutes = require("./routes/auth");
const heroesRoutes = require("./routes/heroes");
const subscribersRoutes = require("./routes/subscribers");
const fansRoutes = require("./routes/fans");

app.use("/api/auth", authRoutes);
app.use("/api/heroes", heroesRoutes);
app.use("/api/subscribers", subscribersRoutes);
app.use("/api/fans", fansRoutes);

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Simple health
app.get("/api/health", (req, res) => res.json({ ok: true }));

async function start() {
  try {
    const mongoUri =
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/proyecto9db";
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server", err);
    process.exit(1);
  }
}

start();
