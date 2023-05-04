const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const SchoolSchema = new Schema(
  {
    name: {
      type: String,
    },
    fullName: {
      type: String,
    },
    motto: {
      type: String,
    },
    role: {
      type: String,
    },
    userID: {
      type: String,
    },
    resetPassowrdToken: String,
    resetPasswordExpires: Date,
    logo: String,
    address: String,
    photoUrl: String,
    email: String,
    telephone: String,
    password: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("accounts", SchoolSchema);
