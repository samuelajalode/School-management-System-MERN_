const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const TaskSchema = new Schema(
  {
    teacherID: String,
    courseID: String,
    classID: String,
    score: String,
    taskData: String,
    date: {
      type: Date,
      default: Date.now,
    },
    deadline: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tasks", TaskSchema);
