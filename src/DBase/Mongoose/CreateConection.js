const mongoose = require("mongoose");
require("dotenv").config();

const CreateConexion = async (id_prod) => {
  let Conn = await mongoose.createConnection(
    `${process.env.MONGODB_URI}${id_prod}${process.env.MONGODB_URI_config}`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );

  await console.log("ii");
  return await Conn.useDb(id_prod);
};
module.exports = CreateConexion;
