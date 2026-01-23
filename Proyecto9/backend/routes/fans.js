const express = require("express");
const router = express.Router();
const Fan = require("../models/fan.model");
const jwt = require("jsonwebtoken");

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

// public: create fan
router.post("/", async (req, res) => {
  try {
    const { nombre, apellido, edad, fechaNacimiento, documento, email } =
      req.body;
    if (!nombre || !email)
      return res.status(400).json({ error: "nombre y email requeridos" });
    const f = new Fan({
      nombre,
      apellido,
      edad,
      fechaNacimiento,
      documento,
      email,
    });
    await f.save();
    res.json({ ok: true, fan: f });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

// admin: list fans
router.get("/", authMiddleware, requireRole("admin"), async (req, res) => {
  try {
    const items = await Fan.find().limit(500).lean();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

module.exports = router;
