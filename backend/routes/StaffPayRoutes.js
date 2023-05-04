const express = require("express");
const StaffPayModel = require("../models/StaffPayModel");

const route = express.Router();

//get banking details
route.get("/", async (req, res) => {
  const docs = await StaffPayModel.find().sort({
    createdAt: "desc",
  });
  res.json(docs);
});

//get one bank details
route.get("/:id", async (req, res) => {
  const docs = await StaffPayModel.findOne({ _id: req.params.id });
  if (docs) {
    return res.json(docs);
  } else {
    return res.json({ error: "", message: "Bank not found" });
  }
});

//get bank details by date

route.post("/create", async (req, res) => {
  const accountNumber = req.body.accountNumber;
  const bankName = req.body.bankName;
  const accountName = req.body.accountName;

  //check if exist
  let isExist = await StaffPayModel.findOne({
    accNumber: req.body.accountNumber,
  });
  if (isExist) {
    return res.json({ error: "Already exists", success: false });
  }

  StaffPayModel.create({
    accountName,
    bankName,
    accountNumber,
  })
    .then((data) => {
      if (data) {
        return res.json({ success: true, message: "OK" });
      } else {
        return res.json({ success: false, message: "something when wrong" });
      }
    })
    .catch((err) => {
      return res.json({ success: false, message: err });
    });
});

//update class register
route.put("/update/:id", async (req, res) => {
  StaffPayModel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    req.body,
    {
      new: true,
    }
  )
    .then((doc) => {
      return res.json({ success: true, message: "OK" });
    })
    .catch((err) => {
      return res.json({ success: false, error: err });
    });
});

//add transctations
route.post("/add/transactions/:id", async (req, res) => {
  StaffPayModel.findOneAndUpdate(
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
      return res.json({ success: false, error: err });
    });
});

//delete
route.delete("/delete/:id", async (req, res) => {
  StaffPayModel.findOneAndDelete({
    _id: req.params.id,
  })
    .then((doc) => {
      return res.json({ success: true, message: "OK" });
    })
    .catch((err) => {
      return res.json({ success: false, error: err });
    });
});

module.exports = route;
