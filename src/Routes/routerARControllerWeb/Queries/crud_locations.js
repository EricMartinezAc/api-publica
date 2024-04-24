const users_schema = require("../Models/users_schema");
const Localidades_schema = require("../Models/Localidades_schema");

const crud_locations = async (proceso, datos) => {
  console.log("realizando CRUD: ", [proceso, datos]);
  //find requesting user
  const reqUser = await users_schema.findOne({ token: datos.token }).exec();
  console.log("user requesting is: ", reqUser);
  if (reqUser.user === datos.user) {
    if (proceso === "all") {
      //rol is PO_? return all,
      if (reqUser.rol === "PO_") {
        const locations = await Localidades_schema.find().exec();
        console.log("locations: ", locations);
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
      // ---- else return only data locations for id user
      else {
        const locations = await Localidades_schema.findOne({
          id_clav_user: reqUser.user,
        }).exec();
        console.log("locations founds: ", locations);
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
    }
    if (proceso === "create") {
      if (
        datos.datosLocation !== "" ||
        typeof datos.datosLocation !== "undefined"
      ) {
        const findLocation = await Localidades_schema.findOne({
          nombre_localidades: datos.datosLocation.name,
        }).exec();
        if (findLocation !== null) {
          const newLocation = await new Localidades_schema(datos.datosLocation);
          const savedLocation = await newLocation.save();
          return (await savedLocation) === null
            ? {
                statusCode: 203,
                datos: null,
                msj: `${datos.user} no ha podido almacenar datos`,
              }
            : {
                statusCode: 202,
                datos: savedLocation,
                msj: `${datos.user} ha cargado localidades a satisfacción`,
              };
        } else {
          return await {
            statusCode: 203,
            datos: null,
            msj: `${datos.user} no a encontrado en base de datos`,
          };
        }
      }
    }
  } else {
    return await {
      statusCode: 500,
      datos: null,
      msj: `${datos.user} no a encontrado coincidencias`,
    };
  }
};

module.exports = { crud_locations };
