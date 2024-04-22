const jwt = require("jsonwebtoken");

module.exports = async function verifyInToken(Bearer, req) {
  try {
    if (typeof Bearer !== "undefined") {
      req.token = await Bearer.split(" ")[1];
      req.user = await Bearer.split(" ")[2];
      console.log([Bearer, req.token, req.user]);
      const resp = await jwt.verify(
        req.token,
        process.env.PSW_JWT,
        (error, data) => {
          return error ? error : true;
        }
      );
      return await resp;
    } else {
      console.error("verifytoken", 403);
      return false;
    }
  } catch (error) {
    return false;
  }
};
