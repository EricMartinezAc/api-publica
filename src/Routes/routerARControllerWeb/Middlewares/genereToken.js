const jwt = require("jsonwebtoken");

module.exports = async function genereToken(name) {
  return await jwt.sign(
    name + ";" + String(new Date(Date.now()).getDate()),
    process.env.PSW_JWT
  );
};
