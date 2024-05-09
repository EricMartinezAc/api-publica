const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

//MIDDLEWARES
//- datos
const keyAPI = "eSxScgGhIesARyB1Uf4zo9dkfacCAgWhlG2EZxpr";

router.get("/nasa-api", (req, res) => {
  const a = fetch("https://epic.gsfc.nasa.gov/api/enhanced/date/2024-04-01")
    .then((res) => res.json())
    .then((data) => console.log(data));
  res.send(a);
});

module.exports = router;
