const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

//modulos bd
const Conexiondb = require("../DBase/Mongoose/ConexionMongo");
const users_schema = require("../DBase/Mongoose/Models/users_schema");
const {
  FindByUSUandPsw,
  RegtrByUSUandPsw,
  FindAndUpdateToken,
} = require("../DBase/Mongoose/Queries/CRUD_users");
const ValideAuth = require("./Middlewares/ValideAuth");

//ENDPOINTS

//RUTAS
//### AUTENTICACIÓN
router.post("/users/auth", ValideAuth(req), async (req, res) => {
  if (
    req.body.datos_.user !== "" &&
    req.body.datos_.user !== undefined &&
    req.body.datos_.pswLogin !== "" &&
    req.body.datos_.pswLogin !== undefined &&
    req.body.datos_.id_prod !== "" &&
    req.body.datos_.id_prod !== undefined &&
    typeof req.body.datos_.rol !== "undefined" &&
    req.body.process_ === "auth"
  ) {
    //informe datos ingresan
    console.log(["into", req.body.process_, req.body.datos_]);
    //modelar datos
    const { user, pswLogin, id_prod, clav_prodct, rol } = req.body.datos_;

    //proceso
    try {
      await Conexiondb(id_prod);
      //consultar si existe
      let respFindByUSUandPsw = await FindByUSUandPsw(
        user,
        pswLogin,
        clav_prodct,
        rol
      );
      //informe de busqueda
      console.log(respFindByUSUandPsw);

      if (respFindByUSUandPsw === "bad") {
        //informe respuesta de búsqueda
        console.log("E-405");
        res.json({
          valor: 405,
          msj: `${user} E-305: Su producto no está registrado. Pongase en contacto con soporte técnico`,
        });
      }
      if (respFindByUSUandPsw !== null) {
        console.log("existente");
        jwt.sign(
          respFindByUSUandPsw.user +
            ";" +
            String(new Date(Date.now()).getDate()),
          "Rouse17*",
          async (err, token) => {
            if (err === null) {
              const resptFindAndUpdateToken = await FindAndUpdateToken(
                respFindByUSUandPsw._id.toString(),
                token
              );
              //informe de respuesta
              console.log(resptFindAndUpdateToken);
              await res.json({
                valor: 400,
                msj: `Bienvenido ${user}, ahora tienes el control`,
                respt: token,
              });
            } else {
              console.log(
                `No se pudo generar token para ${user}. Error E-404: ${err}`
              );
              res.json({
                valor: 404,
                msj: `No se pudo generar token`,
                respt: err,
              });
            }
          }
        );
      } else {
        console.log("No encontrado");
        res.json({
          valor: 403,
          msj: `${user} E-403: No se encontraron coincidencias `,
        });
      }
    } catch (error) {
      res.json({
        valor: 402,
        msj: `${user}: ${error}`,
      });
    }
  } else {
    res.json({
      valor: 401,
      msj: "Datos enviados son erroneos",
    });
  }
});

//### REGISTRO
router.post("/users/regtr", ValideAuth(req), async (req, res) => {
  if (
    req.body.datos_.user !== "" &&
    req.body.datos_.user !== undefined &&
    req.body.datos_.pswLogin !== "" &&
    req.body.datos_.pswLogin !== undefined &&
    req.body.datos_.id_prod !== "" &&
    req.body.datos_.id_prod !== undefined &&
    typeof req.body.datos_.rol !== "undefined" &&
    req.body.process_ === "regtr"
  ) {
    //informe datos ingresan
    console.log(["into", req.body.process_, req.body.datos_]);
    //modelar datos
    const { user, pswLogin, id_prod, clav_prodct, rol } = req.body.datos_;

    //proceso
    try {
      await Conexiondb(id_prod);
      //consultar si existe
      let respFindByUSUandPsw = await FindByUSUandPsw(
        user,
        pswLogin,
        clav_prodct,
        rol
      );
      if (respFindByUSUandPsw === "bad") {
        //informe respuesta de búsqueda
        console.log("E-305");
        res.json({
          valor: 305,
          msj: `${user} E-305: Su producto no está registrado. Pongase en contacto con soporte técnico`,
        });
      } else {
        if (respFindByUSUandPsw === null) {
          console.log(
            `Búsqueda retorna: ${respFindByUSUandPsw}, Registrando..`
          );
          let respRegtrByUSUandPsw = await RegtrByUSUandPsw(
            user,
            pswLogin,
            rol
          );
          console.log(`... Registrado: ${respRegtrByUSUandPsw}`);
          res.json(
            (await respRegtrByUSUandPsw.length) > 0 ||
              (await respRegtrByUSUandPsw) !== null
              ? {
                  valor: 300,
                  msj: `Usuario ${user} fue almacenado exitosamente`,
                  id_: respRegtrByUSUandPsw._id,
                }
              : {
                  valor: 304,
                  msj: `Error en almacenamiento ${user}, compruebe su conexión`,
                }
          );
        } else {
          //informe respuesta de búsqueda
          console.log("E-303");
          res.json({
            valor: 303,
            msj: `${user} E-303: Ya se encuentra registrado `,
          });
        }
      }
    } catch (error) {
      res.json({
        valor: 302,
        msj: `${user}: ${error}`,
      });
    }
  } else {
    res.json({
      valor: 301,
      msj: "Datos enviados son erroneos",
    });
  }
});

module.exports = router;
