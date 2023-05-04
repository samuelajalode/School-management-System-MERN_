const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const CourserSchema = new Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    classID: {
      type: String,
    },
    classes: {
      type: [
        {
          teacher: String,
          class: String,
          _id: String,
        },
      ],
    },
    department: {
      type: String,
    },
    type: {
      type: String,
    },
    teacher: {
      type: String,
    },
    default: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("courses", CourserSchema);
