const users_schema = require("../Models/users_schema");
const prodct_schema = require("../Models/products_schema");
const branch_schema = require("../Models/branch_schema");
const genereToken = require("../Middlewares/genereToken");
const { env_ } = require("../Middlewares/comunResources");

const crud_user = async (proceso, datos) => {
  console.log("realizando CRUD user: ", datos);
  if (proceso === "auth") {
    //useDB:
    const DB = await prodct_schema
      .findOne({
        owner: datos.owner,
      })
      .exec();
    //findUSer:
    if (DB !== null) {
      const find = await users_schema
        .findOne({
          user: datos.user,
          pswLogin: datos.pswLogin,
          id_prodct: DB._id,
        })
        .exec();
      return (await find) !== null
        ? {
            statusCode: 200,
            datos: find,
            msj: `${datos.user} Bienvenido de vuelta`,
          }
        : {
            statusCode: 403,
            datos: null,
            msj: `${datos.user} / password incorrect`,
          };
    } else {
      return await {
        statusCode: 403,
        datos: null,
        msj: `${datos.owner} no fue encontrado`,
      };
    }
  }
  if (proceso === "regtr") {
    //useDB
    console.log("register user...");
    let DB = await prodct_schema
      .findOne({ owner: datos.owner, clav_prodct: datos.clav_prodct })
      .exec();
    if (DB !== null) {
      console.log(DB.owner, "bd selected... goin to be find user if exist");
      const findUSerIfExist = await users_schema
        .findOne({
          user: datos.user,
          pswLogin: datos.pswLogin,
          id_prodct: DB._id,
        })
        .exec();
      if (findUSerIfExist === null) {
        try {
          console.log("user dont exist. it going to be regist");
          const resptoken = await genereToken(datos.user, env_.PSW_JWT);
          console.log("token generated", resptoken);
          const newUser = await new users_schema({
            user: datos.user,
            pswLogin: datos.pswLogin,
            token: resptoken,
            rol: datos.rol,
            id_prodct: DB._id,
          });
          const saved = await newUser.save();
          if (saved !== null) {
            console.log("fin", saved);
            return await {
              statusCode: 200,
              datos: saved,
              msj: `Bienvenido ${datos.user}, ahora tienes el control`,
            };
          } else {
            console.log("fin", saved);
            return await {
              statusCode: 204,
              datos: saved,
              msj: `no fue posible amacenar ${datos.user}`,
            };
          }
        } catch (error) {
          return { statusCode: 500, datos: null, msj: error };
        }
      } else {
        console.log(findUSerIfExist, "user existing");
        return await {
          statusCode: 204,
          datos: null,
          msj: `${datos.user} ya se encuentra registrado`,
        };
      }
    } else {
      console.log(DB, "product not found");
      return await {
        statusCode: 403,
        datos: null,
        msj: "no se encontró producto",
      };
    }
  }
};
const loadData = async (proceso, datos) => {
  console.log("realizando CRUD load data: ", datos);
  if (proceso === "all") {
    try {
      const owner = await prodct_schema.findOne({ owner: datos.owner });
      const userReq = await users_schema.findOne({
        user: datos.datos.user,
        token: datos.datos.token,
      });
      if (owner !== null && userReq !== null) {
        const usersOfOwner = await users_schema.find({
          id_prodct: owner._id,
        });
        if (usersOfOwner.length > 0) {
          if (userReq.rol === "PO") {
            let branch = await branch_schema.find({ id_prodct: owner._id });
            return await {
              statusCode: userReq !== null ? 200 : 403,
              datos: { userReq, usersOfOwner, branch },
              msj:
                userReq !== null
                  ? `${datos.user} ha sido cargado encontrado`
                  : `${datos.user} no encontrado`,
            };
          }
          if (userReq.rol === "PM") {
            let branch = await branc_schema.findOne({
              gerente: userReq._id,
              id_prodct: owner._id,
            });
            return await {
              statusCode: userReq !== null ? 200 : 403,
              datos: { userReq, branch },
              msj:
                userReq !== null
                  ? `${datos.datos.user} ha sido cargado encontrado`
                  : `${datos.datos.user} no encontrado`,
            };
          }
        }
      } else {
        return await {
          statusCode: 203,
          datos: null,
          msj: `datos no encontrados`,
        };
      }
    } catch (error) {
      return await {
        statusCode: 403,
        datos: null,
        msj: `${datos.datos.user} con error: ${error}`,
      };
    }
  }
};
const FindAndUpdateToken = async (id, _token) => {
  return users_schema.findByIdAndUpdate({ _id: id }, { token: _token });
};

module.exports = { crud_user, loadData, FindAndUpdateToken };
