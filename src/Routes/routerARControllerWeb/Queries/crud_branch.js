const users_schema = require("../Models/users_schema");
const prodct_schema = require("../Models/products_schema");
const branch_schema = require("../Models/branch_schema");
const { env_ } = require("../Middlewares/comunResources");

const postBranch = async (proceso, datos) => {
  try {
    console.log("realizando CRUD branch : ", [proceso, datos]);
    return await {
      statusCode: respUpdate !== null ? 200 : 203,
      datos: null,
      msj: respUpdate !== null ? `Edición exitosa` : `No se pudo editar`,
    };
    // if (proceso === "addAny") {
    //   let branch = await branch_schema
    //     .find({
    //       centroCosto: datos.datos.centroCosto,
    //       id_prodct: datos.datos.id_prodct,
    //     })
    //     .exec();
    //   if (branch !== null) {
    //     const newBranch = new branch_schema(datos.datos);
    //     const respSave = await newBranch.save();
    //     return await {
    //       statusCode: respSave !== null ? 200 : 203,
    //       datos: null,
    //       msj:
    //         respSave !== null
    //           ? `${datos.datos.id_prodct} ha sido almacenado una nueva sucursal`
    //           : `No se pud almacenar`,
    //     };
    //   } else {
    //     return await {
    //       statusCode: 203,
    //       datos: null,
    //       msj: "ya existe una sucursal registrada al centro de costo entrante",
    //     };
    //   }
    // }
    // if (proceso === "edit") {
    //   const respUpdate = await branch_schema
    //     .findByIdAndUpdate(datos.datos)
    //     .exec();
    //   return await {
    //     statusCode: respUpdate !== null ? 200 : 203,
    //     datos: null,
    //     msj: respUpdate !== null ? `Edición exitosa` : `No se pudo editar`,
    //   };
    // }
    // if (proceso === "delete") {
    //   const respDelete = await branch_schema
    //     .findOneAndDelete(datos.datos)
    //     .exec();
    //   return await {
    //     statusCode: respDelete !== null ? 200 : 203,
    //     datos: null,
    //     msj: respDelete !== null ? `Edición exitosa` : `No se pudo editar`,
    //   };
    // }
  } catch (error) {
    return await {
      statusCode: 500,
      datos: null,
      msj: `${error}`,
    };
  }
};

module.exports = { postBranch };
