const jwt = require("jsonwebtoken");
const { env_ } = require("./comunResources");

module.exports = async function verifyIntoAndToken(Bearer, req, datos) {
  try {
    if (typeof Bearer !== "undefined") {
      req.owner = await Bearer.split(" ")[1];
      req.token = await Bearer.split(" ")[2];
      req.user = await Bearer.split(" ")[3];
      req.process = await Bearer.split(" ")[4];
      const resp = await jwt.verify(req.token, env_.PSW_JWT, (error, data) => {
        return error ? false : true;
      });
      {
        console.log(`${token}: verified`);
        return await resp;
      }
    } else {
      if (typeof req.body.token !== "undefined") {
        await jwt.verify(req.body.token, env_.PSW_JWT, (error, data) => {
          console.log(`${token}: refused`);
          return error ? false : true;
        });
        return true;
      } else {
        console.error("verifytoken", 403);
        return false;
      }
    }
  } catch (error) {
    return false;
  }
};
