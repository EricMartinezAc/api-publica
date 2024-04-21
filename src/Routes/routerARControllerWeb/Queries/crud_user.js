const users_schema = require("../Models/users_schema");
const prodct_schema = require("../Models/products_schema");
const genereToken = require("../Middlewares/genereToken");

const crud_user = async (proceso, datos) => {
  //if(ValideDatosCRUDUSER(proceso, datos)){
  console.log("realizando CRUD");
  if (proceso === "auth") {
    const find = await users_schema
      .findOne({
        user: datos.user,
        pswLogin: datos.pswLogin,
      })
      .exec();
    return await {
      statusCode: 200,
      datos: find,
      msj: `${datos.user} Bienvenido de vuelta`,
    };
  }
  if (proceso === "regtr") {
    let findProdct = await prodct_schema
      .findOne({ clav_prodct: datos.clav_prodct })
      .exec();
    if (findProdct !== null) {
      console.log(3, findProdct);
      const findUSerIfExist = await users_schema
        .findOne({
          user: datos.user,
          pswLogin: datos.pswLogin,
          id_clav_prodct: findProdct._id,
        })
        .exec();
      console.log(4, findUSerIfExist);
      if (findUSerIfExist === null) {
        try {
          const resptoken = await genereToken(datos.user, "Rouse17*");
          console.log(5, resptoken);
          const newUser = await new users_schema({
            user: datos.user,
            pswLogin: datos.pswLogin,
            token: resptoken,
            rol: datos.rol,
            id_clav_prodct: findProdct._id,
          });
          const saved = await newUser.save();
          console.log("fin", saved);
          return await {
            statusCode: 200,
            datos: saved,
            msj: `Bienvenido ${datos.user}, ahora tienes el control`,
          };
        } catch (error) {
          return { statusCode: 500, datos: null, msj: error };
        }
      } else {
        return await {
          statusCode: 204,
          datos: null,
          msj: `${datos.user} ya se encuentra registrado`,
        };
      }
    } else {
      console.log("product not found");
      return await {
        statusCode: 403,
        datos: null,
        msj: "no se encontró producto",
      };
    }
  }

  //} else{ ..}
};
const FindAndUpdateToken = async (id, _token) => {
  return users_schema.findByIdAndUpdate({ _id: id }, { token: _token });
};

module.exports = { crud_user, FindAndUpdateToken };
