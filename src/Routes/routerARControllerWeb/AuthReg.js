const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

//modulos bd
const Conexiondb = require("../../DBase_setup/Mongoose/ConexionMongo");
const ValideAuth = require("./Middlewares/ValideAuth");
const { crud_user, FindAndUpdateToken } = require("./Queries/crud_user");

//ENDPOINTS
// router.get(
//   "/users/into",
//   async (req, res, next) =>
//     (await ValideAuth(req.body.datos_))
//       ? next()
//       : (req.statusCode = 403) & next(),
//   async (req, res) => {
//     console.log(
//       `${req.baseUrl} ${req.hostname} ${req.ip} ${req.params} ${req.body} `
//     );
//     res.json({ statusCode: req.statusCode });
//   }
// );
//RUTAS
//### AUTENTICACIÓN

router.post(
  "/users/auth",
  (req, res, next) =>
    ValideAuth(req.body.datos_, "auth")
      ? next()
      : (req.statusCode = 403 & res.json({ statusCode: 403 })),
  async (req, res) => {
    //informe datos ingresando
    console.log(["into", req.body.process_, req.body.datos_]);
    //modelar datos
    const { owner, clav_prodct, user, pswLogin } = req.body.datos_;
    //proceso de login
    try {
      await Conexiondb(owner);
      //consultar si existe
      const respFindUser = await crud_user("auth", {
        owner,
        clav_prodct,
        user,
        pswLogin,
      });
      //informe de busqueda
      console.log(user, respFindUser);
      //sin coincidencias, reject
      if (respFindUser === null) {
        res.json({
          statusCode: 405,
          msj: `${user} E-001: Error de autenticación.`,
        });
      }
      //coincidencias encontradas, genere y reemplace si existe token
      if (respFindByUSUandPsw !== null) {
        //gerenerar token
        jwt.sign(
          respFindUser.user + ";" + String(new Date(Date.now()).getDate()),
          "Rouse17*",
          async (err, token) => {
            if (err === null) {
              const resptFindAndUpdateToken = await FindAndUpdateToken(
                respFindUser._id.toString(),
                token
              );
              //informe de respuesta
              console.log(user, resptFindAndUpdateToken);
              await res.json({
                statusCode: 200,
                msj: `Bienvenido ${user}, ahora tienes el control`,
                token: token,
              });
            } else {
              console.log(
                `No se pudo generar token para ${user}. Error E-002: ${err}`
              );
              res.json({
                valor: 404,
                msj: `No se pudo generar token`,
                respt: err,
              });
            }
          }
        );
      }
    } catch (error) {
      res.json({
        statusCode: 403,
        msj: `${user}: ${error}`,
      });
    }
  }
);

//### REGISTRO
router.post(
  "/users/regtr",
  (req, res, next) => {
    ValideAuth(req.body.datos_, "regtr")
      ? next()
      : (req.statusCode = 403 & res.json({ statusCode: 403 }));
  },
  async (req, res) => {
    //informe datos ingresando
    console.log(["into", req.body.process_, req.body.datos_]);
    //modelar datos
    const { owner, clav_prodct, user, pswLogin, rol } = req.body.datos_;

    //proceso de regtr
    try {
      await Conexiondb(owner);
      //consultar si existe
      const timeNow = String(new Date(Date.now()).getDate());
      const respFindUser = await crud_user(req.body.process_, {
        owner,
        clav_prodct,
        user,
        pswLogin,
        rol,
      });
      //informe respuesta de búsqueda
      console.log("responde " + user, respFindUser);
      // encuentra coincidencias, reject
      // if (respFindUser !== null) {
      //   res.json({
      //     statusCode: 401,
      //     msj: `${user} E-003: Ya se encuentra registrado`,
      //   });
      // }
      // coincidencias NO encontradas,genere token y Alamacene user
      // if (respFindUser === null) {
      //   gerenerar token
      //   jwt.sign(
      //     user + ";" + String(new Date(Date.now()).getDate()),
      //     "Rouse17*",
      //     async (err, token) => {
      //       if (err === null) {
      //         almacene user con token
      //         const respRegtr = await crud_user(
      //           "regtr",
      //           clav_prodct,
      //           user,
      //           pswLogin,
      //           token,
      //           rol
      //         );
      //         informe de respuesta
      //         console.log(user, respRegtr);
      //         await res.json({
      //           statusCode: 200,
      //           msj: `Bienvenido ${user}, ahora tienes el control`,
      //           token: token,
      //         });
      //       } else {
      //         console.log(
      //           `No se pudo generar token para ${user}. Error E-002: ${err}`
      //         );
      //         res.json({
      //           valor: 404,
      //           msj: `No se pudo generar token`,
      //           respt: err,
      //         });
      //       }
      //     }
      //   );
      // }
    } catch (error) {
      res.json({
        statusCode: 403,
        msj: `${user}: ${error}`,
      });
    }
  }
);

module.exports = router;
