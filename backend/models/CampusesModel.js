const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const CampusSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("campus", CampusSchema);
