const express = require("express");
const router = require("./src/router");
const App = express();

App.use(router);
App.set("port", process.env.PORT || 2024);

App.listen(App.get("port"), () => {
  console.log(`${App.get("port")} is run`);
});
