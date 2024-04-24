const mongoose = require("mongoose");
require("dotenv").config();

//process.env.mongodb_UR
const Conexiondb = () => {
  mongoose
    .connect(
      `${process.env.MONGODB_URI}arcweb${process.env.MONGODB_URI_config}`
    )
    .then(() => console.log("arcweb: is conected"))
    .catch((error) => console.error(error));
  mongoose.set("strictQuery", true);
};
module.exports = Conexiondb;
