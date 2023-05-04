const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const OptionsModel = new Schema(
  {
    events: {
      type: [
        {
          type: String,
        },
      ],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("optionsdata", OptionsModel);
