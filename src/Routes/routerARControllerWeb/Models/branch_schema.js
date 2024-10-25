const mongoose = require("mongoose");

const branch_schema = new mongoose.Schema({
  sucursal: {
    type: String,
    required: true,
  },
  pais: {
    type: String,
    required: true,
  },
  ciudad: {
    type: String,
    required: true,
  },
  dpto: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  centroCosto: {
    type: String,
    required: true,
  },
  jerarquia: {
    type: String,
    required: false,
  },
  tipo: {
    type: String,
    required: true,
  },
  clasificacion: {
    type: String,
    required: true,
  },
  prioridad: {
    type: String,
    required: true,
  },
  politica: {
    type: Array,
    required: false,
  },
  inicioOp: {
    type: String,
    required: true,
  },
  contacto: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  team: {
    type: Array,
    default: [],
  },
  imagen: {
    type: String,
    required: false,
  },
  areas: {
    type: Array,
    default: [],
  },
  proveedores: {
    type: Array,
    default: [],
  },
  rrhh: {
    type: Array,
    default: [],
  },
  state: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("branch", branch_schema);
