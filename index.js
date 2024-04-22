const express = require("express");
const cors_ = require("cors");
const routerCpannel = require("./src/Routes/Cpannel/routerCpannel");
const routerARControllerAuthRegtr = require("./src/Routes/routerARControllerWeb/AuthReg");
const routerARControllerApp = require("./src/Routes/routerARControllerWeb/App");
const queriesARControllerAuthRegtr = require("./src/Routes/routerARControllerWeb/Queries");
const routerPlanets = require("./src/Routes/nasaAPI/routerPlanets");
const App = express();
require("dotenv").config();

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
App.use("/arcontroller/web/", queriesARControllerAuthRegtr);

//Route 404
App.use("*", (req, res) => {
  console.error(`${res.statusCode} from ${req.url} by ${req.ip}`);
});

App.set("port", process.env.PORT || 2025);

App.listen(App.get("port"), () => {
  console.log(`${App.get("port")} is run`);
});
