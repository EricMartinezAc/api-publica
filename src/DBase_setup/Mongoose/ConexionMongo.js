const mongoose = require("mongoose");
require("dotenv").config();

//process.env.mongodb_UR
const Conexiondb = (clav_prodct) =>
  mongoose.connect(
    `${process.env.MONGODB_URI}${clav_prodct}${process.env.MONGODB_URI_config}`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
mongoose.set("strictQuery", true);

module.exports = Conexiondb;
