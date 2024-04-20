const mongoose = require("mongoose");
require("dotenv").config();

//process.env.mongodb_UR
const Conexiondb = (owner) => {
  mongoose
    .connect(
      `${process.env.MONGODB_URI}${owner}${process.env.MONGODB_URI_config}`
    )
    .then(() => console.log(owner, ": is conected"))
    .catch((error) => console.error(error));
  mongoose.set("strictQuery", true);
};
module.exports = Conexiondb;
