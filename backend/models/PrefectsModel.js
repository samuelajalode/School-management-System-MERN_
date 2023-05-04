const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const PrefectsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
    },
    userID: {
      type: String,
    },
    startYear: {
      type: String,
    },
    endYear: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("prefects", PrefectsSchema);
