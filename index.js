const express = require("express");
const cors_ = require("cors");
const router = require("./src/Routes/router");
const routerARControllerApp = require("./src/Routes/routerARControllerWeb/App");
const App = express();

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

//access point for arcontroller web
App.use("arcontroller/web/", router);
App.use("arcontroller/web/", routerARControllerApp);

//Route 404
App.use("*", (req, res) => {
  console.error(`404 from ${req.url} by ${req.ip}`);
  res.status(404);
});

App.set("port", process.env.PORT || 2024);

App.listen(App.get("port"), () => {
  console.log(`${App.get("port")} is run`);
});
