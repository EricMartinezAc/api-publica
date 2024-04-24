const express = require("express");
const router = express.Router();

//modulos bd
const Conexiondb = require("../../DBase_setup/Mongoose/ConexionMongoARCweb");
const Headers = require("./Middlewares/Headers");
const { crud_locations } = require("./Queries/crud_locations");
const verifyInToken = require("./Middlewares/verifyIntoAndToken");

//### para get, todos los procesos de búsqueda
router.get(
  "/locations/queries/find",
  (req, res, next) => {
    verifyInToken(req.headers["autorization"], req)
      ? next()
      : res.json({ statusCode: 403, msj: "verify token failure", data: null });
  },
  async () => {
    await Headers(res);
    //informe datos ingresando
    console.log(["into", req.process, req.owner, req.user, req.token]);
    //modelar datos
    const proceso = req.process;
    const token = req.token;
    const owner = req.owner;
    try {
      await Conexiondb();
      const respon = await crud_locations(process, { owner, user, token });
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

module.exports = router;
