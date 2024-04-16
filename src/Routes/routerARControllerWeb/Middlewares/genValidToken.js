const jwt = require("jsonwebtoken");
const VerifyInToken = require("./VerifyInToken");
async function a() {
  await jwt.sign(
    "eric" + ";" + String(new Date(Date.now()).getDate()),
    "Rouse17*",
    async (err, token) => {
      console.log(1, err);
      console.log(2, token);
      const Bheader = {
        autorization: `Bearer ${token}`,
      };
      await VerifyInToken(Bheader);
    }
  );
}
a();
