const jwt = require("jsonwebtoken");

module.exports = async function genereToken(name, psw) {
  return await jwt.sign(
    name + ";" + String(new Date(Date.now()).getDate()),
    psw
  );
};
