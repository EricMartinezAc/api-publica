const express = require("express");
const router = express.Router();
const VerifyInToken = require("./Middlewares/verifyInToken");
const Headers = require("./Middlewares/Headers");

//RUTAS
//-- enrutamiento seguro a dashboard
router.get(
  "/app/dashboard",
  (req, res, next) => {
    next();
  },
  async (req, res) => {
    console.log("entrado a get app: ", req.token);
    res.json({
      statusCode: 200,
    });
  }
);

//-- configuraciones generales
//router.get("/app/settings", )

module.exports = router;
