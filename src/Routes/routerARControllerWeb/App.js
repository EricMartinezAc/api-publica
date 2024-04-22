const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const VerifyInToken = require("./Middlewares/verifyInToken");
const Headers = require("./Middlewares/Headers");

//RUTAS
//-- enrutamiento seguro a dashboard
router.get(
  "/app/dashboard",
  (req, res, next) => {
    Headers(res);
    VerifyInToken(req.headers["autorization"], req)
      ? next()
      : res.json({ statusCode: 403, msj: "verify token failure", data: null });
  },
  async (req, res) => {
    console.log("entrado a get app: ", req.token);
    await jwt.verify(req.token, process.env.PWS_JWT, (error, data) => {
      if (error) {
        console.error(403, error);
        res.json({
          statusCode: 403,
          msj: "Error en generación de token: " + error,
          data: null,
        });
      } else {
        console.log("todo dashboard", data.split(";")[0]);
        res.json({
          statusCode: 200,
          msj: "redireccionando a dashboard",
          data: data.split(";"),
        });
      }
    });
  }
);

//-- configuraciones generales
//router.get("/app/settings", )

module.exports = router;
