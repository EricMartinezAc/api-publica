const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

//MIDDLEWARES
//- generate token
function GenerateToken(datos) {
  jwt.sign(
    datos.user + ";" + String(new Date(Date.now()).getDate()),
    "Rouse17*",
    async (err, token) => {
      if (err === null) {
        //informe de respuesta
        console.log(token);
        await res.json({
          valor: 400,
          msj: `token generado ${token}, ahora tienes el control`,
        });
      } else {
        console.log(
          `No se pudo generar token para ${token}. Error E-404: ${err}`
        );
        res.json({
          valor: 404,
          msj: `No se pudo generar token`,
        });
      }
    }
  );
}
//-- verifica si viene cabecera
function VerifyInToken(req, res, next) {
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
}

router.get("/", (req, res) => {
  res.json({ key: "value" });
});

router.post("/", GenerateToken, (req, res) => {
  res.json({ new: "der" });
});

module.exports = router;
