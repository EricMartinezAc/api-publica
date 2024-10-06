const mongoose = require("mongoose");
require("dotenv").config();

const Conexiondb = (dominio) => {
  mongoose
    .connect(
      `${process.env.MONGODB_URI}${dominio}${process.env.MONGODB_URI_config}`
    )
    .then(async () => {
      console.log("Database is connected");
      // Listar colecciones
      // const collections = await mongoose.connection.db
      //   .listCollections()
      //   .toArray();
      // console.log("Colecciones en la base de datos:");
      // collections.forEach((collection) => {
      //   console.log(collection.name);
      // });

      // // Listar documentos de la colección especificada
      // const documents = await mongoose.connection
      //   .collection(collectionName)
      //   .find()
      //   .toArray();
      // console.log(`Documentos en la colección ${collectionName}:`);
      // console.log(documents);
    })
    .catch((error) => console.error("Connection error:", error));

  mongoose.set("strictQuery", true);
};

module.exports = Conexiondb;
