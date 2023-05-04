const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const AcademicYearSchema = new Schema(
  {
    currentYear: {
      type: String,
    },
    currentTerm: {
      type: String,
    },
    code: {
      type: String,
      default: "admin",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("academicYear", AcademicYearSchema);
