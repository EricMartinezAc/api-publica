const users_schema = require("../Models/users_schema");
const prodct_schema = require("../Models/prodct_schema");

const FindByUSUandPsw = async (user, pswLogin, clav_prodct, rol) => {
  let findProdct = await prodct_schema.findOne({ clav_prodct }).exec();
  if (findProdct !== null) {
    console.log(`Buscando...`);
    return await users_schema.findOne({ user, pswLogin, rol }).exec();
  } else {
    console.log("clave erronea");
    return await "bad";
  }
};
const RegtrByUSUandPsw = async (user, pswLogin, rol) => {
  return await new users_schema({ user, pswLogin, rol }).save();
};

const FindAndUpdateToken = (id, _token) => {
  return users_schema.findByIdAndUpdate({ _id: id }, { token: _token });
};

module.exports = { FindByUSUandPsw, RegtrByUSUandPsw, FindAndUpdateToken };
