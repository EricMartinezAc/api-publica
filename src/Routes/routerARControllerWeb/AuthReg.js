const express = require("express");
const router = express.Router();
const Headers = require("./Middlewares/Headers");

//modulos bd
const Conexiondb = require("../../DBase_setup/Mongoose/ConexionMongoARCweb");
const ValideAuth = require("./Middlewares/ValideAuth");
const { crud_user, FindAndUpdateToken } = require("./Queries/crud_user");

//### REGISTRO
router.post(
  "/users/regtr",
  (req, res, next) => {
    ValideAuth(req.body.datos_, "regtr")
      ? next()
      : (req.statusCode =
          403 &
          res.json({
            statusCode: 403,
            token: null,
            msj: `no permitido ingreso de datos`,
          }));
  },
  async (req, res) => {
    await Headers(res);
    //informe datos ingresando
    console.log(["into", req.body.process_, req.body.datos_]);
    //modelar datos
    const { owner, clav_prodct, user, pswLogin, rol } = req.body.datos_;

    //proceso de regtr
    try {
      await Conexiondb();
      //registro de usuario
      //response
      const respon = await crud_user(req.body.process_, {
        owner,
        clav_prodct,
        user,
        pswLogin,
        rol,
      });
      console.log("response:", respon);
      await res.json(respon);
      //await
      //res.json();
      // almacenado con exito
    } catch (error) {
      res.json({
        statusCode: 403,
        token: null,
        msj: `${user}: ${error}`,
      });
    }
  }
);

//### INICIO SESIÓN
router.post(
  "/users/auth",
  (req, res, next) => {
    ValideAuth(req.body.datos_, "auth")
      ? next()
      : (req.statusCode =
          403 &
          res.json({
            statusCode: req.statusCode,
            token: null,
            msj: `no permitido ingreso de datos`,
          }));
  },
  async (req, res) => {
    await Headers(res);
    //informe datos ingresando
    console.log(["into", req.body.process_, req.body.datos_]);
    //modelar datos
    const { owner, user, pswLogin } = req.body.datos_;
    //proceso de regtr
    try {
      await Conexiondb();
      //registro de usuario
      //response
      const respon = await crud_user(req.body.process_, {
        owner,
        user,
        pswLogin,
      });
      console.log("response:", respon);
      await res.json(respon);
      // almacenado con exito
    } catch (error) {
      res.json({
        statusCode: 403,
        token: null,
        msj: `${user}: ${error}`,
      });
    }
  }
);

module.exports = router;
