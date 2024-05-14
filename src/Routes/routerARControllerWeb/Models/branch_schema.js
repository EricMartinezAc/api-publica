const mongoose = require("mongoose");

const branch_schema = new mongoose.Schema({
  sucursal: {
    type: String,
    required: true,
  },
  ubicacion: {
    type: Array,
    required: true,
    default: [], //pais region ciudad direccion gpsData
  },
  centroCosto: {
    type: String,
    required: true,
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
  inicioOp: {
    type: String,
  },
  contactos: {
    type: Array,
    default: [],
  },
  team: {
    type: Array,
    default: [],
  },
  imagen: {
    type: Array,
    default: [],
  },
  areas: {
    type: Array,
    default: [],
  },
  proveedores: {
    type: Array,
    default: [],
  },
  gerente: {
    type: String,
    required: true,
  },
  id_prodct: {
    type: mongoose.Types.ObjectId,
    ref: "prodct",
    required: true,
  },
  state: {
    type: String,
  },
});

module.exports = mongoose.model("branch", branch_schema);
