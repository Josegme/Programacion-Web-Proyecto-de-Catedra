const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Subscriber = require("../models/subscriber.model");
const User = require("../models/user.model");

const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";

// subscribe (public) - body: { email }
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "email required" });

    const exists = await Subscriber.findOne({ email });
    if (exists) return res.json({ ok: true, message: "already subscribed" });

    const sub = new Subscriber({ email });
    await sub.save();
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

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

// admin: list subscribers
router.get("/", authMiddleware, requireRole("admin"), async (req, res) => {
  try {
    const list = await Subscriber.find().sort({ createdAt: -1 }).lean();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: "server error" });
  }
});

module.exports = router;
