const mongoose = require("mongoose");

const MateriaSchema = new mongoose.Schema(
  {
    nombre: { type: String },
    nota: { type: Number },
  },
  { _id: false }
);

const HeroSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String },
    poderes: { type: [String], default: [] },
    imagen: { type: String },
    // campos educativos (si se usa heroes.json como ejemplo)
    edad: { type: Number },
    curso: { type: String },
    promedio: { type: Number },
    materias: { type: [MateriaSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hero", HeroSchema);
