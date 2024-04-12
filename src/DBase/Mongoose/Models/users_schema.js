const mongoose = require("mongoose");

const users_schema = new mongoose.Schema({
  user: {
    type: String,
    required: false,
  },
  pswLogin: {
    type: String,
    required: false,
  },
  token: {
    type: String,
    required: false,
  },
  rol: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("user", users_schema);
