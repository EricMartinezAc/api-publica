//MIDDLEWARES
//-- verifica si viene cabecera
module.exports = function VerifyInToken(req, res, next) {
  const Bheader = req.headers["autorization"];
  if (typeof Bheader !== "undefined") {
    req.token = Bheader.split(" ")[1];
    req.id_prod = Bheader.split(" ")[2];
    req.user = Bheader.split(" ")[3];
    console.log(Bheader);
    next();
  } else {
    console.error(403);
    res.sendStatus(403);
  }
};
