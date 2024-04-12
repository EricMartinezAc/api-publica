const users_schema = require("../Models/users_schema");
const enterprise_schema = require("../Models/enterprise_schema");

//Buscando datos de usuario owner con token
const FindUserByIdOnProduct = async (token, user) => {
  return await users_schema.findOne({ token, user }).exec();
};
//Cargando toda data con dato de owner
const FindDataByIdUser = (datas) => {
  console.log("buscando::: ", datas);
  return enterprise_schema.findOne({ datas }).exec();
};

module.exports = { FindUserByIdOnProduct, FindDataByIdUser };
