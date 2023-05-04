const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const FeesSchema = new Schema(
  {
    name: {
      type: String,
    },
    code: {
      type: String,
    },
    term: String,
    year: String,
    day: {
      type: {
        name: {
          type: String,
          default: "day",
        },
        tution: String,
        facility: String,
        maintenance: String,
        exam: String,
      },
    },
    freshDay: {
      type: {
        name: {
          type: String,
          default: "freshDay",
        },
        tution: String,
        facility: String,
        maintenance: String,
        exam: String,
      },
    },
    border: {
      type: {
        name: {
          type: String,
          default: "border",
        },
        tution: String,
        facility: String,
        maintenance: String,
        exam: String,
      },
    },
    freshBorder: {
      type: {
        name: {
          type: String,
          default: "freshBorder",
        },
        tution: String,
        facility: String,
        maintenance: String,
        exam: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("fees", FeesSchema);
