const express = require("express");
const router = require("./src/router");
const App = express();

App.use(router);
App.set("port", 2024 || process.env.PORT);

App.listen(App.get("port"), () => {
  console.log(`${App.get("port")} is run`);
});
