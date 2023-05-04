const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const SectionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("sections", SectionSchema);
