const users_schema = require("../Models/users_schema");
const prodct_schema = require("../Models/products_schema");
const genereToken = require("../Middlewares/genereToken");

const crud_user = async (proceso, datos) => {
  //if(ValideDatosCRUDUSER(proceso, datos)){
  let findProdct = await prodct_schema
    .findOne({ clav_prodct: datos.clav_prodct })
    .exec();
  if (findProdct !== null) {
    if (proceso === "auth")
      return await users_schema
        .findOne({
          user: datos.user,
          pswLogin: datos.pswLogin,
          rol: datos.rol,
          id_clav_prodct: findProdct._id,
        })
        .exec();
    if (proceso === "regtr") {
      const findUSerIfExist = await users_schema
        .findOne({
          user: datos.user,
          pswLogin: datos.pswLogin,
          id_clav_prodct: findProdct._id,
        })
        .exec();
      if (findUSerIfExist === null) {
        try {
          const resptoken = await genereToken(datos.user, "Rouse17*");
          const newUser = await new users_schema({
            user: datos.user,
            pswLogin: datos.pswLogin,
            token: resptoken,
            rol: datos.rol,
            id_clav_prodct: findProdct._id,
          });
          await newUser.save();
          return await {
            statusCode: 200,
            token: resptoken,
            msj: `Bienvenido ${datos.user}, ahora tienes el control`,
          };
        } catch (error) {
          return { statusCode: 500, token: null, msj: error };
        }
      } else {
        return await {
          statusCode: 204,
          token: null,
          msj: `${datos.user} ya se encuentra registrado`,
        };
      }
    }
  } else {
    console.log("product not found");
    return await { statusCode: 403 };
  }
  //} else{ ..}
};
const FindAndUpdateToken = async (id, _token) => {
  return users_schema.findByIdAndUpdate({ _id: id }, { token: _token });
};

module.exports = { crud_user, FindAndUpdateToken };
