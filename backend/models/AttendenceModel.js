const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const AttendanceSchema = new Schema(
  {
    classID: {
      type: String,
      required: true,
    },
    role: {
      type: String,
    },
    user: String,
    users: {
      type: [
        {
          userID: String,
          name: String,
          surname: String,
          status: Boolean,
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("attendance", AttendanceSchema);
