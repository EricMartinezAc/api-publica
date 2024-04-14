const users_schema = require("../Models/users_schema");
const prodct_schema = require("../Models/products_schema");

const crud_user = async (proceso, clav_prodct, user, pswLogin, token, rol) => {
  let findProdct = await prodct_schema.findOne({ clav_prodct }).exec();
  if (findProdct !== null) {
    if (proceso === "auth") {
      const resp = await users_schema
        .findOne({
          user: user,
          pswLogin: pswLogin,
          id_clav_prodct: findProdct._id,
        })
        .exec();
      return await resp;
    }
    if (proceso == "regtr") {
      const resp = await users_schema
        .save({
          user: user,
          pswLogin: pswLogin,
          token: token,
          rol: rol,
          id_clav_prodct: findProdct._id,
        })
        .exec();
      return await resp;
    }
  } else {
    console.log("product not found");
    return await { statusCode: 403 };
  }
};
const FindAndUpdateToken = async (id, _token) => {
  return users_schema.findByIdAndUpdate({ _id: id }, { token: _token });
};

module.exports = { crud_user, FindAndUpdateToken };
