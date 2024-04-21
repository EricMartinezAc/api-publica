const mongoose = require("mongoose");
require("dotenv").config();
const users_schema = require("./src/Routes/routerARControllerWeb/Models/users_schema");

//process.env.mongodb_UR
async function Conexiondb() {
  const db = await mongoose.createConnection(
    `${process.env.MONGODB_URI}$arc{process.env.MONGODB_URI_config}`
  );
  await db.on("open", () =>
    console.log(1, "Mongoose successfully connected...")
  );
  await db.on("error", (err) =>
    console.log(0, "Mongoose connection error", err)
  );
  return db;
}
async function main(db) {
  const conn = Conexiondb();

  // Le indicas que Base de datos usar
  const arcwebtest = conn.useDb("arcwebtest", { useCache: true });

  // Y Finalmente para los modelos
  const ModelData = arcwebtest.model("Model", users_schema, "Model");
  console.log(2, ModelData);
  const findUSers = ModelData.findOne({
    user: "eric",
    pswLogin: "qwerty",
  }).exec();
  console.log("fin", findUSers);
}

main("arcwebtest");
