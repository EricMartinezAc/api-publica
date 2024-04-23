const users_schema = require("../Models/users_schema");
const Localidades_schema = require("../Models/Localidades_schema");

const crud_locations = async (proceso, datos) => {
  console.log("realizando CRUD: ", datos);
  //find requesting user
  const reqUser = await users_schema.findOne({ token: datos.token });
  if (proceso === "getAllLocations") {
    //rol is PO_? return all,
    if (reqUser.rol === "PO_") {
      const locations = await Localidades_schema.find().exec();
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
  if (proceso === "createLocations") {
  }
};

module.exports = { crud_locations };
