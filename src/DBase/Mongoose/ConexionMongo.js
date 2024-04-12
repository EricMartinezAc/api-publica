const mongoose = require("mongoose");
require("dotenv").config();

//process.env.mongodb_UR
const Conexiondb = (id_prod) =>
  mongoose.connect(
    `${process.env.MONGODB_URI}${id_prod}${process.env.MONGODB_URI_config}`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
mongoose.set("strictQuery", true);

module.exports = Conexiondb;
