const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const UsersSchema = new Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    type: {
      type: String,
    },
    lastlogin: {
      type: Date,
    },
    restrictions: {
      type: Object,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", UsersSchema);
