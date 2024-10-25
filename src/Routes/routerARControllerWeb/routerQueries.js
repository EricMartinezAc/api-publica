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
  "/loadAllData",
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
    console.log(["into load data", req.body]);
    //modelar datos
    const { owner, token, _id } = req.body;
    //proceso de
    try {
      const dominio = owner.split("@")[1].split(".").slice(0, -1).join(".");
      await Conexiondb(dominio);
      //response
      const respon = await loadData("loadAllData", owner, token, _id);
      console.log("response:", respon);
      await res.json(respon);
      // almacenado con exito
    } catch (error) {
      console.error(error);
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
    //modelar datos
    const { owner } = req.body;
    //registro de branch
    const dominio = owner.split("@")[1].split(".").slice(0, -1).join(".");
    await Conexiondb(dominio);
    const respon = await postBranch("branch/add/any", req.body);
    //response
    console.log("response:", respon);
    await res.json(respon);
    // almacenado con exito
  } catch (error) {
    console.log("tt", error);
  }
});

module.exports = router;
