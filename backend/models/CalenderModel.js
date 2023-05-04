const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const CalendarSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    resource: {
      type: String,
    },
    description: {
      type: String,
    },
    start: {
      type: Date,
    },
    end: {
      type: Date,
    },
    allDay: {
      type: Boolean,
    },
    day: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("calendar", CalendarSchema);
