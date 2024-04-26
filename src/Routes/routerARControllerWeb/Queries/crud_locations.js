const users_schema = require("../Models/users_schema");
const location_schema = require("../Models/location_schema");
const products_schema = require("../Models/products_schema");

//in {process, datos, token}
const crud_locations = async (proceso, datos) => {
  //find requesting user
  const reqUser = await users_schema
    .findOne({ token: datos.token, user: datos.user })
    .exec();
  console.log("user requesting is: ", reqUser);
  if (proceso === "all") {
    //rol is PO_? return all,
    if (reqUser.rol === "PO") {
      //find requesting owner. its array
      const ownerReq = await products_schema
        .find({ owner: datos.owner })
        .exec();
      console.log(
        "1.2 -1. el limite alto de locations requeridos es por producto, traemos primero el id del producto: ",
        ownerReq[0].owner
      );
      //find all users belonging to owner
      const allUserOfOwner = await users_schema
        .find(
          {
            id_prodct: ownerReq[0]._id,
          },
          { user: 0, pswLogin: 0, token: 0, rol: 0, id_prodct: 0 }
        )
        .limit(10)
        .exec();
      console.log(
        "1.2 -2. traemos todos los usuarios pertenecientes al owner en cuestion: ",
        allUserOfOwner[0]
      );
      //find all locations
      if (allUserOfOwner.length > 1) {
        console.log(
          "1.2 -3. buscamos todas las localidades que tengan como id_user, el id de los usuarios en cuestion"
        );
        const allLocations = await location_schema.find();
        console.log(await allLocations, 0);

        return {
          statusCode: 200,
          msj: `${datos.token} ha cargado localidades parciales`,
          datos: allLocations,
        };
      } else {
        return await {
          statusCode: 404,
          datos: null,
          msj: `${datos.token} no cuenta con loaclidades`,
        };
      }
    }
    // ---- else return only data locations for id user
    else {
      const locations = await Localidades_schema.findOne({
        id_user: reqUser._id,
      }).exec();
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
  }
  if (proceso === "one") {
    if (
      typeof datos.nombreLocalidades !== "undefined" &&
      typeof datos.paisLocalidades !== "undefined" &&
      typeof datos.ciudadLocalidades !== "undefined" &&
      typeof datos.dptoLocalidades !== "undefined" &&
      typeof datos.typeLocalidades !== "undefined"
    ) {
      const findLocation = await Localidades_schema.findOne({
        nombreLocalidades: datos.nombreLocalidades,
      }).exec();
      if (findLocation !== null) {
        const newLocation = await new Localidades_schema(datos);
        const savedLocation = await newLocation.save();
        return (await savedLocation) === null
          ? {
              statusCode: 203,
              data: null,
              msj: `${datos.user} no ha podido almacenar datos`,
            }
          : {
              statusCode: 202,
              data: savedLocation,
              msj: `${datos.user} ha cargado localidades a satisfacción`,
            };
      } else {
        return await {
          statusCode: 203,
          data: null,
          msj: `${datos.user} no a encontrado en base de datos`,
        };
      }
    }
  }
};

module.exports = { crud_locations };
