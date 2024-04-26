const mongoose = require("mongoose");

const location_schema = new mongoose.Schema({
  nombreLocalidades: {
    type: String,
    required: true,
  },
  paisLocalidades: {
    type: String,
    required: true,
  },
  ciudadLocalidades: {
    type: String,
    required: true,
  },
  dptoLocalidades: {
    type: String,
    required: true,
  },
  direccionLocalidades: {
    type: String,
    required: false,
  },
  contactLocalidades: {
    type: String,
    required: false,
  },
  emailLocalidades: {
    type: String,
    required: false,
  },
  fileInputProveedores: {
    type: String,
    required: false,
  },
  fileInputZonas: {
    type: String,
    required: false,
  },
  fileImgLocalidades: {
    type: String,
    required: false,
  },
  typeLocalidades: {
    type: String,
    required: true,
  },
  id_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("location", location_schema);
