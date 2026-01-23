const mongoose = require("mongoose");

const FanSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    apellido: { type: String },
    edad: { type: Number },
    fechaNacimiento: { type: String },
    documento: { type: String },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Fan", FanSchema);
