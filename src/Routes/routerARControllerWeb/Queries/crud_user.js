const users_schema = require("../Models/users_schema");
const prodct_schema = require("../Models/products_schema");
const genereToken = require("../Middlewares/genereToken");
const { env_ } = require("../Middlewares/comunResources");

const crud_user = async (proceso, datos) => {
  //if(ValideDatosCRUDUSER(proceso, datos)){
  console.log("realizando CRUD: ", datos);
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
  if (proceso === "user") {
    try {
      const userData = await users_schema.findOne({
        user: datos.user,
        token: datos.token,
      });

      return await {
        statusCode: userData !== null ? 200 : 403,
        datos: userData,
        msj:
          userData !== null
            ? `${datos.user} ha sido cargado encontrado`
            : `${datos.user} no encontrado`,
      };
    } catch (error) {
      return await {
        statusCode: 403,
        datos: null,
        msj: `${datos.user} con error: ${error}`,
      };
    }
  }

  //} else{ ..}
};
const FindAndUpdateToken = async (id, _token) => {
  return users_schema.findByIdAndUpdate({ _id: id }, { token: _token });
};

module.exports = { crud_user, FindAndUpdateToken };
