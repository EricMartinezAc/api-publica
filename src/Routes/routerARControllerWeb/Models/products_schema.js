const mongoose = require("mongoose");

const prodct_schema = new mongoose.Schema({
  clav_prodct: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("prodct", prodct_schema);
