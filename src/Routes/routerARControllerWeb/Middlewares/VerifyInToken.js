const jwt = require("jsonwebtoken");

async function verifyInToken(Bearer, req) {
  try {
    if (typeof Bearer !== "undefined") {
      req.token = await Bearer.split(" ")[1];
      req.user = await Bearer.split("")[2];
      req.owner = await Bearer.split(" ")[3];
      console.log([Bearer, req.token, req.user, req.owner]);
      const resp = await jwt.verify(
        req.token,
        process.env.PSW_JWT,
        (error, data) => {
          return error ? false : true;
        }
      );
      return await true;
    } else {
      console.error("verifytoken", 403);
      return false;
    }
  } catch (error) {
    return false;
  }
}

module.exports = verifyInToken;
