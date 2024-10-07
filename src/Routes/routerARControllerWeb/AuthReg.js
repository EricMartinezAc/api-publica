const express = require("express");
const router = express.Router();
const Headers = require("./Middlewares/Headers");

//modulos bd
const ValideAuth = require("./Middlewares/ValideAuth");
const { crud_user, FindAndUpdateToken } = require("./Queries/crud_global");
const Conexiondb = require("../../DBase_setup/Mongoose/ConexionMongoARCweb");
const genereToken = require("./Middlewares/genereToken");

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
    console.log(["into regtr", req.body.process_, req.body.datos_]);
    //modelar datos
    const { owner, clav_prodct, user, pswLogin, rol } = req.body.datos_;
    //proceso .....
    try {
      const dominio = owner.split("@")[1].split(".").slice(0, -1).join(".");
      await Conexiondb(dominio);
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
      if(respon.statusCode === 200){
        const token = await genereToken(user)
        respon.datos.token = token
      }
      await res.json(respon);
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
    console.log(["into auth", req.body.process_, req.body.datos_]);
    //modelar datos
    const { owner, user, pswLogin } = req.body.datos_;
    //proceso ....
    try {
      const dominio = owner.split("@")[1].split(".").slice(0, -1).join(".");
      await Conexiondb(dominio);

      const respon = await crud_user(req.body.process_, {
        owner,
        user,
        pswLogin,
      });
      respon.datos.pswLogin = ''
      console.log("response:", respon);
      if(respon.statusCode === 200){
        const token = await genereToken(user)
        respon.datos.token = token
      }
     await res.json(respon);
    } catch (error) {
      res.json({
        statusCode: 403,
        token: null,
        msj: `${user}...: ${error}`,
      });
    }
  }
);

module.exports = router;
