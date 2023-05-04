const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const TransactionSchema = new Schema(
  {
    amount: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    type: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    chequeNumber: {
      type: String,
    },
    bank: {
      type: String,
    },
    description: String,
    month: String,
    year: String,
    term: String,
    pay: {
      type: {
        accountNumber: String,
        bank: String,
        userID: String,
        position: String,
        month: String,
        year: String,
        salary: String,
      },
    },
    fees: {
      type: {
        userID: String,
        term: String,
        academicYear: String,
        applyTo: {
          all: Boolean,
          tuition: Boolean,
          examination: Boolean,
        },
      },
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("transactions", TransactionSchema);
