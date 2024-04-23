const express = require("express");
const router = express.Router();

//modulos bd
const Conexiondb = require("../../DBase_setup/Mongoose/ConexionMongoARCweb");
const Headers = require("./Middlewares/Headers");
const { crud_locations } = require("./Queries/crud_locations");
const verifyInToken = require("./Middlewares/verifyInToken");

//### para get, solo buscar algo
router.get(
  "/locations/queries/find",
  (req, res, next) => {
    Headers(res);
    verifyInToken(req.headers["autorization"], req)
      ? next()
      : res.json({ statusCode: 403, msj: "verify token failure", data: null });
  },
  async () => {
    //informe datos ingresando
    console.log(["into", req.body.process_, req.body.datos_]);
    //modelar datos
    const proceso = req.body.process_;
    const token = req.body.token;
    const owner = req.body.owner;
    try {
      await Conexiondb(owner);
      const respon = await crud_locations(owner, proceso, token);
      console.log("response: ", respon);
      await res.json(respon);
    } catch (error) {
      res.json({
        statusCode: 403,
        datos: null,
        msj: error,
      });
    }
  }
);
