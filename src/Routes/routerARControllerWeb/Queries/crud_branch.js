const users_schema = require("../Models/users_schema");
const prodct_schema = require("../Models/products_schema");
const branch_schema = require("../Models/branch_schema");
const { env_ } = require("../Middlewares/comunResources");

const postBranch = async (proceso, datos) => {
  try {
    console.log("realizando CRUD branch : ", [proceso]);
    if (proceso === "branch/add/any") {
      const branch = await branch_schema
        .find({
          centroCosto: datos.data.centroCosto,
        })
        .exec();
      if (branch !== null) {
        //proceda a almacenar branch
        const newBranch = new branch_schema(datos.data);
        const respSave = await newBranch.save();
        return await {
          statusCode: respSave !== null ? 200 : 203,
          msj:
            respSave !== null
              ? `${datos.data.sucursal} ha sido almacenado una nueva sucursal`
              : `No se pudo almacenar`,
        };
      } else {
        return await {
          statusCode: 203,
          datos: null,
          msj: "ya existe una sucursal registrada al centro de costo entrante",
        };
      }
    }
    if (proceso === "branch/edit/any") {
      const respUpdate = await branch_schema
        .findByIdAndUpdate(datos.datos)
        .exec();
      return await {
        statusCode: respUpdate !== null ? 200 : 203,
        datos: null,
        msj: respUpdate !== null ? `Edición exitosa` : `No se pudo editar`,
      };
    }
    if (proceso === "branch/delete/any") {
      const respDelete = await branch_schema
        .findOneAndDelete(datos.datos)
        .exec();
      return await {
        statusCode: respDelete !== null ? 200 : 203,
        datos: null,
        msj: respDelete !== null ? `Edición exitosa` : `No se pudo editar`,
      };
    }
    return await {
      statusCode: respUpdate !== null ? 200 : 203,
      datos: null,
      msj: respUpdate !== null ? `Edición exitosa` : `No se pudo editar`,
    };
  } catch (error) {
    return await {
      statusCode: 500,
      datos: null,
      msj: `${error}`,
    };
  }
};

module.exports = { postBranch };
