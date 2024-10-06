const mongoose = require("mongoose");

const users_schema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  pswLogin: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: false,
  },
  rol: {
    type: String,
    required: true,
  },
  id_prodct: {
    type: String,
    // mongoose.Schema.Types.ObjectId,
    // ref: "prodct",
  },
});

module.exports = mongoose.model("user", users_schema);
