module.exports = async function ValideAuth(datos, proceso) {
  //nulidad de datos
  if (proceso === "auth") {
    if (
      datos.owner === "" ||
      datos.owner === undefined ||
      datos.clav_prodct === "" ||
      datos.clav_prodct === undefined ||
      datos.user === "" ||
      datos.user === undefined ||
      datos.pswLogin === "" ||
      datos.pswLogin === undefined
    ) {
      return false;
    } else {
      return true;
    }
  }

  if (proceso === "regtr") {
    if (
      datos.owner === "" ||
      datos.owner === undefined ||
      datos.clav_prodct === "" ||
      datos.clav_prodct === undefined ||
      datos.user === "" ||
      datos.user === undefined ||
      datos.pswLogin === "" ||
      datos.pswLogin === undefined ||
      datos.rol === "" ||
      datos.rol === undefined
    ) {
      return false;
    } else {
      return true;
    }
  }

  if (datos !== undefined && proceso === null) {
    if (datos.user === undefined || datos.token === undefined) {
      return false;
    } else {
      return true;
    }
  }
};
