const express = require("express");
const BankingModel = require("../models/BankingModel");

const route = express.Router();

//get banking details
route.get("/", async (req, res) => {
  const docs = await BankingModel.find().sort({
    createdAt: "desc",
  });
  res.json(docs);
});

//get one bank details
route.get("/:id", async (req, res) => {
  const docs = await BankingModel.findOne({ _id: req.params.id });
  if (docs) {
    return res.json(docs);
  } else {
    return res.json({ error: "Bank not found" });
  }
});

//get bank details by date

route.post("/create", async (req, res) => {
  const accountNumber = req.body.accountNumber;
  const bankName = req.body.bankName;
  const accountName = req.body.accountName;

  //check if exist
  let isExist = await BankingModel.findOne({
    accNumber: req.body.accountNumber,
  });
  if (isExist) {
    return res.json({ error: "Already exists", success: false });
  }

  BankingModel.create({
    accountName,
    bankName,
    accountNumber,
  })
    .then((data) => {
      if (data) {
        return res.json({ success: true, doc: data });
      } else {
        return res.json({ success: false, error: "something when wrong" });
      }
    })
    .catch((err) => {
      return res.json({ success: false, error: "Failed" });
    });
});

//update class register
route.put("/update/:id", async (req, res) => {
  BankingModel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    req.body,
    {
      new: true,
    }
  )
    .then((doc) => {
      return res.json({ success: true, doc });
    })
    .catch((err) => {
      return res.json({ success: false, error: "failed" });
    });
});

//add transctations
route.post("/add/transactions/:id", async (req, res) => {
  BankingModel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $push: { transactions: req.body } },
    {
      new: true,
    }
  )
    .then((doc) => {
      return res.json(doc.transactions);
    })
    .catch((err) => {
      console.log(err);
      return res.json({ success: false, error: "failed" });
    });
});

//delete
route.delete("/delete/:id", async (req, res) => {
  BankingModel.findOneAndDelete({
    _id: req.params.id,
  })
    .then((doc) => {
      return res.json({ success: true, doc });
    })
    .catch((err) => {
      return res.json({ success: false, error: "failed" });
    });
});

module.exports = route;
