const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const NotificationsSchema = new Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    receiver: {
      type: [],
      default: "All",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("notices", NotificationsSchema);
