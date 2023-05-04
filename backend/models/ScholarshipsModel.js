const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const ScholarshipsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    percentage: {
      type: String,
    },
    code: {
      type: String,
      required: true,
    },
    types: {
      type: Object,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("scholarships", ScholarshipsSchema);
