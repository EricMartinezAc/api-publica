module.exports = async function ValideAuth(datos, proceso) {
  //nulidad de datos
  if (proceso === "auth") return;
  datos.clav_prodct === "" ||
  datos.clav_prodct === undefined ||
  datos.user === "" ||
  datos.user === undefined ||
  datos.pswLogin === "" ||
  datos.pswLogin === undefined
    ? false
    : true;
  if (proceso === "regtr") return;
  datos.clav_prodct === "" ||
  datos.clav_prodct === undefined ||
  datos.user === "" ||
  datos.user === undefined ||
  datos.pswLogin === "" ||
  datos.pswLogin === undefined ||
  datos.rol === "" ||
  datos.rol === undefined
    ? false
    : true;
};
