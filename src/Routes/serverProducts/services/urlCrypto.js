const crypto = require("crypto");

const generateSignedUrl = (path) => {
  const expiresIn = 3600;
  const secret = "Qwerty123*";
  const expiry = Math.floor(Date.now() / 1000) + expiresIn;
  const signature = crypto
    .createHmac("sha256", secret)
    .update(`${path}:${expiry}`)
    .digest("hex");

  return `${path}?expires=${expiry}&signature=${signature}`;
};

module.exports = generateSignedUrl;
