//MIDDLEWARES
//-- verifica si viene cabecera
module.exports = function VerifyInToken(Bearer, req) {
  if (typeof Bearer !== "undefined") {
    req.token = Bearer.split(" ")[1];
    req.user = Bearer.split(" ")[2];
    console.log([Bearer, req.token, req.user]);
    return true;
  } else {
    console.error("verifytoken", 403);
    return false;
  }
};
