const mongoose = require("mongoose");

//process.env.mongodb_UR
function Conexiondb() {
  console.log(
    `print: ${process.env.MONGODB_URI}${process.env.MONGODB_URI_config}`
  );
  mongoose
    .connect(`${process.env.MONGODB_URI}${process.env.MONGODB_URI_config}`)
    .then(() => console.log(": is conected"))
    .catch((error) => console.error("error", error));
  setTimeout(() => {
    mongoose.disconnect();
    console.log("owner", ": turn disconected");
  }, 5000);
  mongoose.set("strictQuery", true);
}
Conexiondb();
