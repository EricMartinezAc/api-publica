const mongoose = require("mongoose");
require("dotenv").config();

//process.env.mongodb_UR
const Conexiondb = (owner) => {
  mongoose
    .connect(
      `mongodb+srv://proyectossieng:Rouse17*@cluster0.rz5i0hc.mongodb.net/${owner}?retryWrites=true&w=majority`
    )
    .then(() => console.log(owner, ": is conected"))
    .catch((error) => console.error(error));
  mongoose.set("strictQuery", true);
};
module.exports = Conexiondb;
