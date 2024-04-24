const mongoose = require("mongoose");

const Localidades_schema = mongoose.Schema({
  nombre_localidades: {
    type: String,
    required: true,
  },
  pais_localidades: {
    type: String,
    required: true,
  },
  ciudad_localidades: {
    type: String,
    required: true,
  },
  dpto_localidades: {
    type: String,
    required: true,
  },
  direccion_localidades: {
    type: String,
    required: false,
  },
  contact_localidades: {
    type: String,
    required: false,
  },
  email_localidades: {
    type: String,
    required: false,
  },
  fileInput_proveedores: {
    type: String,
    required: false,
  },
  fileInput_zonas: {
    type: String,
    required: false,
  },
  fileImgLocalidades: {
    type: String,
    required: false,
  },
  id_clav_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports.Localidades_schema = mongoose.model(
  "locations",
  Localidades_schema
);
