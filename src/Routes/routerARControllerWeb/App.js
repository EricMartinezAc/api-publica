const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
  FindUserByIdOnProduct,
  FindDataByIdUser,
} = require("../../DBase/Mongoose/Queries/ConsumeAPI");
const VerifyInToken = require("./Middlewares/VerifyInToken");

//RUTAS
//-- enrutamiento seguro a dashboard
router.get(
  "/app/dashboard",
  (req, res, next) =>
    VerifyInToken(req.headers["autorization"])
      ? next()
      : res.json({ statusCode: 403, msj: "verify token failure" }),
  (req, res) => {
    jwt.verify(req.token, "Rouse17*", (error, data) => {
      if (error) {
        console.error(403, error);
        res.json({
          statusCode: 403,
          msj: "Error en generación de token: " + error,
        });
      } else {
        console.log("todo dashboard", data.split(";")[0]);
        res.json({
          statusCode: 200,
          data: data.split(";")[0],
        });
      }
    });
  }
);

// //-- consumo de API
// router.get("/load/data/startapp", VerifyInToken, async (req, res) => {
//   let token = req.token;
//   let id_prod = req.id_prod;
//   let user = req.user;

//   let LoadDataUser = await FindUserByIdOnProduct(token, user);
//   if (LoadDataUser !== null) {
//     let dataAPI = await FindDataByIdUser(LoadDataUser._id.toString());
//     if (dataAPI !== null) {
//       console.log("====================================");
//       console.log("responde: ", dataAPI);
//       console.log("====================================");
//       res.json({
//         valor: 200,
//         user: LoadDataUser,
//         data: dataAPI,
//         msj: "Datos de aplicación encontrados",
//       });
//     } else {
//       console.log("====================================");
//       console.log("responde: ", dataAPI);
//       console.log("====================================");
//       res.json({
//         valor: 204,
//         msj: "No existen datos asignados al usuario",
//       });
//     }
//   } else {
//     console.log("====================================");
//     console.log("responde: ", LoadDataUser);
//     console.log("====================================");
//     res.json({
//       valor: 203,
//       msj: "Usuario o token expiraron",
//     });
//   }
// });

module.exports = router;
