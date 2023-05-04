const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const PayrowSchema = new Schema(
  {
    type: {
      type: String,
      default: "pay",
    },
    name: String,
    code: String,
    salary: String,
    allowance: String,
    bonus: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("payrow", PayrowSchema);
