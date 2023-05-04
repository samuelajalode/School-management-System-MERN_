const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const NonTeacherSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    class: {
      type: String,
    },
    role: {
      type: String,
      default: "nonteacher",
    },
    telephone: {
      type: String,
    },
    position: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    nextofKin_ID: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
    },
    profileUrl: String,
    userID: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("nonTeachers", NonTeacherSchema, "accounts");
