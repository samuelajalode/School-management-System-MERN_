const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const BankingSchema = new Schema(
  {
    bankName: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
    },
    accountName: {
      type: String,
    },
    transactions: {
      type: Array,
      // type: [
      //   {
      //     date: {
      //       type: Date,
      //       default: Date.now,
      //     },
      //     description: String,
      //     payee: String,
      //     transactionNumber: String,
      //     credit: String,
      //     debit: String,
      //     type: String,
      //     bankAcc: String,
      //     issuedDate: {
      //       type: Date,
      //       default: Date.now,
      //     },
      // },
      // ],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
  { typeKey: "$type" }
);

module.exports = mongoose.model("banking", BankingSchema);
