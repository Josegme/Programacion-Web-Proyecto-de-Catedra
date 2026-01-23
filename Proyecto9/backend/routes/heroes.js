const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Hero = require("../models/hero.model");
const multer = require("multer");
const path = require("path");

// multer setup: store uploads in backend/uploads with original name prefixed by timestamp
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, name);
  },
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit

const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "token missing" });
  const token = auth.split(" ")[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: "invalid token" });
  }
}

function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: "unauthorized" });
    if (req.user.role !== role)
      return res.status(403).json({ error: "forbidden" });
    next();
  };
}

// public read
router.get("/", async (req, res) => {
  try {
    const items = await Hero.find().lean().limit(100);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const item = await Hero.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: "server error" });
  }
});

// protected: admin
router.post("/", authMiddleware, requireRole("admin"), async (req, res) => {
  try {
    const h = new Hero(req.body);
    await h.save();
    res.json(h);
  } catch (err) {
    res.status(500).json({ error: "server error" });
  }
});

// public: simple hero registration (from frontend form). Accepts image as base64 string.
router.post("/register", async (req, res) => {
  try {
    const { nombre, alterEgo, imagenBase64, origen } = req.body;
    if (!nombre) return res.status(400).json({ error: "nombre requerido" });
    const hero = new Hero({
      nombre,
      descripcion: origen || "",
      poderes: alterEgo ? [alterEgo] : [],
      imagen: imagenBase64 || undefined,
    });
    await hero.save();
    res.json({ ok: true, hero });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

// public: register hero via multipart/form-data (file upload)
router.post("/register-file", upload.single("imagen"), async (req, res) => {
  try {
    const { nombre, alterEgo, origen } = req.body;
    if (!nombre) return res.status(400).json({ error: "nombre requerido" });
    const imagenPath = req.file ? `/uploads/${req.file.filename}` : undefined;
    const hero = new Hero({
      nombre,
      descripcion: origen || "",
      poderes: alterEgo ? [alterEgo] : [],
      imagen: imagenPath,
    });
    await hero.save();
    res.json({ ok: true, hero });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

router.put("/:id", authMiddleware, requireRole("admin"), async (req, res) => {
  try {
    const updated = await Hero.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "server error" });
  }
});

router.delete(
  "/:id",
  authMiddleware,
  requireRole("admin"),
  async (req, res) => {
    try {
      await Hero.findByIdAndDelete(req.params.id);
      res.json({ ok: true });
    } catch (err) {
      res.status(500).json({ error: "server error" });
    }
  }
);

module.exports = router;
