const express = require("express");
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de conexión - usa variables de entorno si las defines
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_NAME = process.env.DB_NAME || "promo_db";
const DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3307; // XAMPP puede usar 3307

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Health check
app.get("/api/health", (req, res) => res.json({ ok: true }));

// Insertar registro promocional
app.post("/api/promo", async (req, res) => {
  const { nombre, apellido, dni, mail } = req.body;
  if (!nombre || !apellido || !dni || !mail) {
    return res.status(400).json({ error: "Faltan campos" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO promo_signups (nombre, apellido, dni, email) VALUES (?, ?, ?, ?)",
      [nombre, apellido, dni, mail]
    );
    return res.json({ ok: true, id: result.insertId });
  } catch (err) {
    console.error("DB error:", err);
    return res
      .status(500)
      .json({ error: "Error al insertar en la base de datos" });
  }
});

// Obtener últimos registros (opcional)
app.get("/api/promo", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, nombre, apellido, dni, email, created_at FROM promo_signups ORDER BY created_at DESC LIMIT 100"
    );
    return res.json({ ok: true, rows });
  } catch (err) {
    console.error("DB error:", err);
    return res.status(500).json({ error: "Error al leer la base de datos" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(
    `Server listening on http://localhost:${PORT} (DB ${DB_HOST}:${DB_PORT}/${DB_NAME})`
  )
);
