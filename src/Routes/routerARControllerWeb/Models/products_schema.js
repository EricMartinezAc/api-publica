const mongoose = require("mongoose");

const prodct_schema = new mongoose.Schema({
  owner: {
    type: String,
    required: true,
  },
  clav_prodct: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("prodct", prodct_schema);
