const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const DivisionSchema = new Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("division", DivisionSchema);
