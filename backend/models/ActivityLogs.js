const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const ActivitySchema = new Schema(
  {
    activity: {
      type: String,
    },
    user: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ativity", ActivitySchema);
