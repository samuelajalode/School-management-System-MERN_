const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const CorrespondanceSchema = new Schema(
  {
    address: {
      type: String,
      required: true,
    },
    salutation: {
      type: String,
    },
    subject: {
      type: String,
      required: true,
    },
    body: {
      type: String,
    },
    closing: {
      type: String,
    },
    signature: {},
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("correspondance", CorrespondanceSchema);
