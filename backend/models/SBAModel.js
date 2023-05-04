const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const SBASchema = new Schema(
  {
    class: {
      type: String,
      required: true,
    },
    course: {
      type: String,
    },
    academicYear: {
      type: String,
    },
    term: {
      type: String,
    },
    exam: {
      type: Number,
    },
    examPercentage: {
      type: Number,
    },
    classWork: {
      type: Number,
    },
    classWorkPercentage: {
      type: Number,
    },
    students: {
      type: [
        {
          userID: String,
          name: String,
          position: String,
          examPercentage: Number,
          exam: Number,
          classWork: Number,
          classWorkPercentage: Number,
          total: Number,
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("sba", SBASchema);
