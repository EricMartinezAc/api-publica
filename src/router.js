const { verify } = require("crypto");
const express = require("express");
const router = express.Router();

//MIDDLEWARES
//-- verifica si viene cabecera
function VerifyInToken(req, res, next) {
  const Bheader = req.headers["autorization"];
  if (typeof Bheader !== "undefined") {
    req.token = Bheader.split(" ")[1];
    req.id_prod = Bheader.split(" ")[2];
    req.user = Bheader.split(" ")[3];
    console.log(Bheader);
    next();
  } else {
    console.error(403);
    res.sendStatus(403);
  }
}

router.get("/", (req, res) => {
  res.json({ key: "value" });
});

router.post("/", VerifyInToken, (req, res) => {
  res.json({ new: "der" });
});

module.exports = router;
