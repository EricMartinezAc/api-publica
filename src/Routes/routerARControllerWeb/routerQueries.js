const express = require("express");
const router = express.Router();

//modulos bd
const Conexiondb = require("../../DBase_setup/Mongoose/ConexionMongoARCweb");
const { crud_user } = require("./Queries/crud_user");
const { crud_locations } = require("./Queries/crud_locations");
const Headers = require("./Middlewares/Headers");
const ValideAuth = require("./Middlewares/ValideAuth");
const verifyPostToken = require("./Middlewares/verifyPostToken");
const verifyIntoAndToken = require("./Middlewares/verifyIntoAndToken");

//### load datos iniciales
router.post(
  "/user",
  (req, res, next) => {
    ValideAuth(req.body)
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
    console.log(["into", req.body]);
    //proceso de
    try {
      await Conexiondb();
      //registro de usuario
      //response
      const respon = await crud_user("user", req.body);
      console.log("response:", respon);
      await res.json(respon);
      // almacenado con exito
    } catch (error) {
      res.json({
        statusCode: 403,
        token: null,
        msj: `${req.body.user}: ${error}`,
      });
    }
  }
);

//### load

router.get(
  "/locations/queries",
  (req, res, next) => {
    verifyIntoAndToken(req.headers["autorization"], req)
      ? next()
      : res.json({ statusCode: 403, msj: "verify token failure", data: null });
  },
  async (req, res) => {
    await Headers(res);
    //informe datos ingresando
    console.log(["into", req.process, req.owner, req.user, req.token]);
    //modelar datos
    const process = req.process;
    const owner = req.owner;
    const token = req.token;
    const user = req.user;
    try {
      await Conexiondb();
      await crud_locations(process, { owner, user, token }).then((data) => {
        console.log("response: ", data);
        res.json(data);
      });
    } catch (error) {
      res.json({
        statusCode: 403,
        datos: null,
        msj: error,
      });
    }
  }
);

//### para add, todos los procesos de agregar localidad
// in {process, datos, token}
// out { statusCode, data, msj }

router.post(
  "/locations/queries",
  (req, res, next) => {
    verifyPostToken(req.body)
      ? next()
      : (req.statusCode =
          403 &
          res.json({
            statusCode: 403,
            data: req.body,
            msj: `no permitido ingreso de datos`,
          }));
  },
  async (req, res) => {
    await Headers(res);
    //informe datos ingresando
    console.log([
      "into",
      req.body.process,
      req.body.datos,
      req.body.user,
      req.body.token,
    ]);
    //proceso de add
    try {
      await Conexiondb();
      //registro de add
      //response
      const respon = await crud_locations(req.body.process, {
        token: req.body.token,
        datos: req.body.datos,
        user: req.body.user,
      });
      console.log("response:", respon);
      await res.json(respon);
      //await
      //res.json();
      // almacenado con exito
    } catch (error) {
      res.json({
        statusCode: 403,
        data: null,
        msj: `${user}: ${error}`,
      });
    }
  }
);

module.exports = router;
