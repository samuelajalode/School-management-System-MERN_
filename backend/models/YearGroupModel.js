const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const YearGroupSchema = new Schema(
  {
    name: {
      type: String,
    },
    code: {
      type: String,
    },
    year: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("yeargroup", YearGroupSchema);
