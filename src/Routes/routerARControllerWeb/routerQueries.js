const express = require("express");
const router = express.Router();

//modulos bd
const Conexiondb = require("../../DBase_setup/Mongoose/ConexionMongoARCweb");
const { loadData } = require("./Queries/crud_global");
const { postBranch } = require("./Queries/crud_branch");
const Headers = require("./Middlewares/Headers");
const valideDataQueries = require("./Middlewares/valideDataQueries");

//### load datos iniciales
router.post(
  "/user",
  (req, res, next) => {
    valideDataQueries(req.body)
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
      const respon = await loadData("all", req.body);
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

//### registro branch
router.post("/branch/add/any", async (req, res) => {
  try {
    await Headers(res);
    //informe datos ingresando
    console.log(["into", req.body]);
    await Conexiondb();
    //registro de branch
    const respon = await postBranch(req.body);
    //response
    console.log("response:", respon);
    await res.json(respon);
    // almacenado con exito
  } catch (error) {
    console.log("tt", error);
  }
});

module.exports = router;
