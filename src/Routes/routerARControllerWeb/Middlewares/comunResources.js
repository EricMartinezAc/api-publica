require("dotenv").config("../../../../.env");

const env_ = {
  MONGODB_URI_defaul: process.env.MONGODB_URI_defaul,
  MONGODB_URI: process.env.MONGODB_URI,
  MONGODB_URI_config: process.env.MONGODB_URI_config,
  PSW_JWT: process.env.PSW_JWT,
};

module.exports = { env_ };
