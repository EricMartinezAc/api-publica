const mongoose = require("mongoose");

const areas_schemas = new mongoose.Schema({
  area: {
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
  clasificacion: {
    type: Array,
    default: [],
  },
  inicioOp: {
    type: String,
    required: true,
  },
  contactos: {
    type: Array,
    default: [],
  },
  contactos: {
    type: Array,
    default: [],
  },
  gerente: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  team: {
    type: Array,
    default: [],
  },
  id_prodct: {
    type: mongoose.Types.ObjectId,
    ref: "prodct",
    required: true,
  },
});

module.exports = mongoose.model("area", areas_schemas);
