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
        const resptoken = await genereToken(datos.user, "Rouse17*");
        const newUser = await new users_schema({
          user: datos.user,
          pswLogin: datos.pswLogin,
          token: resptoken,
          rol: datos.rol,
          id_clav_prodct: findProdct._id,
        });
        console.log((await "nuevo") + newUser);
        return await newUser.save();
      } else {
        return await findUSerIfExist;
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
