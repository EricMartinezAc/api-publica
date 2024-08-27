const express = require("express");
const cors_ = require("cors");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const routerCpannel = require("./src/Routes/Cpannel/routerCpannel");
const routerARControllerAuthRegtr = require("./src/Routes/routerARControllerWeb/AuthReg");
const routerARControllerApp = require("./src/Routes/routerARControllerWeb/App");
const routerARControllerQueries = require("./src/Routes/routerARControllerWeb/routerQueries");
const routerPlanets = require("./src/Routes/nasaAPI/routerPlanets");
const routerServerProducts = require("./src/Routes/serverProducts/routerServerProducts");
const App = express();
require("dotenv").config();

//statics
App.use(
  "/server/liive/images",
  express.static(path.join(__dirname, "storageProducts"))
);


// middlewares
App.use(
  express.json({
    limit: "35mb",
  })
);
App.use(
  cors_({
    origin: "*",
  })
);
//access point for Cpannel
App.use("/", routerCpannel);
//access point for NASA API
App.use("/nasa/web/", routerPlanets);
//access point for arcontroller web
App.use("/arcontroller/web/", routerARControllerAuthRegtr);
App.use("/arcontroller/web/", routerARControllerApp);
App.use("/arcontroller/web/", routerARControllerQueries);
App.use("/server/liive/", routerServerProducts);

//Route 404
App.use("*", (req, res) => {
  console.error(
    ` no found router ${res.statusCode} from ${req.url} by ${req.ip}`
  );
});

App.set("port", process.env.PORT || 2025);

App.listen(App.get("port"), () => {
  console.log(`${App.get("port")} is run`);
});
