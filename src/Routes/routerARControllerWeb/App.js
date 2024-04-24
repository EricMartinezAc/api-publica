const express = require("express");
const router = express.Router();
const VerifyInToken = require("./Middlewares/verifyIntoAndToken");
const Headers = require("./Middlewares/Headers");

//RUTAS
//-- enrutamiento seguro a dashboard
router.get(
  "/app/dashboard",
  (req, res, next) => {
    VerifyInToken(req.headers["autorization"], req)
      ? next()
      : res.json({ statusCode: 403, msj: "verify token failure", data: null });
  },
  async (req, res) => {
    await Headers(res);
    console.log("entrado a get app: ", req.token);
    res.json({
      statusCode: 200,
    });
  }
);

//-- configuraciones generales
//router.get("/app/settings", )

module.exports = router;
