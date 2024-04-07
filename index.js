const express = require("express");
const cors_ = require("cors");
const router = require("./src/router");
const App = express();

App.use(router);
App.set("port", process.env.PORT || 2024);

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

//Route 404
App.use("*", (req, res) => {
  console.error(`404 from ${req.url} by ${req.ip}`);
  res.status(404);
});

App.listen(App.get("port"), () => {
  console.log(`${App.get("port")} is run`);
});
