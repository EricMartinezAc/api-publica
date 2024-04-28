const jwt = require("jsonwebtoken");
const { env_ } = require("./comunResources");

module.exports = async function valideDataQueries(datos) {
  try {
    if (datos !== undefined) {
      return await true;
    } else {
      return await false;
    }
  } catch (error) {
    return await false;
  }
};
