const users_schema = require("../Models/users_schema");
const location_schema = require("../Models/location_schema");
const products_schema = require("../Models/products_schema");
const mongoose = require("mongoose");

//in {process, datos, token}
const crud_locations = async (proceso, datos) => {
  //find requesting user
  const reqUser = await users_schema
    .findOne({ token: datos.token, user: datos.user })
    .exec();
  console.log("user requesting is: ", reqUser);
  if (proceso === "findAll") {
    console.log("findall.............", reqUser._id);
    const locations = await location_schema
      .find({
        id_user: mongoose.Types.ObjectId(reqUser._id),
      })
      .exec();
    console.log("locations only requesting user: ", locations);
    return (await locations) !== null
      ? {
          statusCode: 200,
          datos: locations,
          msj: `${datos.token} ha cargado localidades parciales`,
        }
      : {
          statusCode: 404,
          datos: null,
          msj: `${datos.token} no cuenta con loaclidades`,
        };
  }

  if (proceso === "createOne") {
    if (
      typeof datos.datos.nombreLocalidades !== "undefined" &&
      typeof datos.datos.paisLocalidades !== "undefined" &&
      typeof datos.datos.ciudadLocalidades !== "undefined" &&
      typeof datos.datos.dptoLocalidades !== "undefined" &&
      typeof datos.datos.typeLocalidades !== "undefined"
    ) {
      console.log("init create: ", datos.datos);
      const findLocation = await location_schema
        .findOne({
          nombreLocalidades: datos.datos.nombreLocalidades,
        })
        .exec();
      if (findLocation === null) {
        datos.datos.id_user = reqUser._id;
        const newLocation = await new location_schema(datos.datos);
        console.log("almacenando: ", datos.datos);
        const savedLocation = await newLocation.save();
        return (await savedLocation) === null
          ? {
              statusCode: 203,
              data: null,
              msj: `${datos.user} no ha podido almacenar datos`,
            }
          : {
              statusCode: 200,
              data: savedLocation,
              msj: `${datos.user} ha cargado localidades a satisfacción`,
            };
      } else {
        return await {
          statusCode: 203,
          data: null,
          msj: `${datos.user} ya a encontrado un ${datos.datos.nombreLocalidades}`,
        };
      }
    }
  }
};

module.exports = { crud_locations };
