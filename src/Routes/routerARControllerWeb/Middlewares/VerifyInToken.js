//MIDDLEWARES
//-- verifica si viene cabecera
module.exports = function VerifyInToken(req, res, next) {
  const Bheader = req.headers["autorization"];
  if (typeof Bheader !== "undefined") {
    req.token = Bheader.split(" ")[1];
    return true;
  } else {
    console.error("verifytoken", 403);
    return false;
  }
};
