const mongoose = require("mongoose");
const ConexionMongoDB = require("../ConexionMongo");
const users_schema = require("../Models/users_schema");

const RegistrDatosUser = async (id_prod, user, pswLogin) => {
  await ConexionMongoDB(id_prod);
  const USER = await users_schema({ user: user, pswLogin: pswLogin });

  await USER.save()
    .then((resp) => {
      return { value: true, resp: resp };
    })
    .catch((error) => {
      console.error(error);
      return { value: "error en registro", e: error };
    });
};

module.exports = RegistrDatosUser;
