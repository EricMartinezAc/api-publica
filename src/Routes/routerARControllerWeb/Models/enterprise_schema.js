const mongoose = require("mongoose");

const enterprise_schema = mongoose.Schema({
  datas: [
    {
      rs: {
        type: String,
        required: false,
      },
      tp_id: {
        type: String,
        required: false,
      },
      no_id: {
        type: String,
        required: false,
      },
    },
  ],
});

module.exports = mongoose.model("enterprise", enterprise_schema);
