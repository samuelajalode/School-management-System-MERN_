const express = require("express");
const CanteenModel = require("../models/CanteenModel");
const StudentModel = require("../models/StudentModel");

const route = express.Router();

//get all members
route.get("/", async (req, res) => {
  const docs = await CanteenModel.find().sort({
    createdAt: "desc",
  });
  res.json(docs);
});

//get all  payments
route.get("/payments", async (req, res) => {
  const docs = await CanteenModel.find();
  let payments = docs.map((e) => {
    return e.payments.map((i) => {
      return {
        amount: i.amount,
        date: i.date,
        _id: i._id,
        memberID: e.memberID,
        name: e.name,
      };
    });
  });
  var merged = [].concat.apply([], payments);
  res.json(merged);
});

//get one by id
route.get("/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  await CanteenModel.findOne({ memberID: req.params.id })
    .then((docs) => {
      if (docs) {
        return res.json({ success: true, user: docs });
      } else {
        return res.json({ success: false, error: "Does not exists" });
      }
    })
    .catch((err) => {
      return res.json({ success: false, error: "Server error" });
    });
});

//get one by userID
route.get("/user/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  await CanteenModel.findOne({ userID: req.params.id })
    .then((docs) => {
      if (docs) {
        return res.json({ success: true, user: docs });
      } else {
        return res.json({ success: false, error: "Does not exists" });
      }
    })
    .catch((err) => {
      return res.json({ success: false, error: "Server error" });
    });
});

//create
route.post("/create", async (req, res) => {
  let body = req.body;
  const isuserExist = await StudentModel.findOne({ userID: req.body.userID });
  if (!isuserExist) {
    return res.json({ success: false, error: "User ID  does not exist" });
  }
  const isExist = await CanteenModel.findOne({ userID: req.body.userID });
  if (isExist) {
    return res.json({ success: false, error: "Member already exist" });
  }
  //create id
  const currentYear = new Date().getFullYear();
  const number = await CanteenModel.countDocuments();

  console.log(number);

  let memberID = "CA" + currentYear + (number + 1);

  let checkMemberIDExist = await CanteenModel.findOne({ memberID: memberID });

  if (checkMemberIDExist) {
    memberID = memberID + 1;
  }

  CanteenModel.create({ ...body, memberID })
    .then((doc) => {
      console.log(doc);
      res.json({ success: true, user: doc });
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false, message: err });
    });
});

//make payment
route.put("/payment/:id", async (req, res) => {
  const isExist = await CanteenModel.findOne({ memberID: req.params.id });
  if (!isExist) {
    return res.json({ success: false, error: "Member does not exist" });
  }

  CanteenModel.findOneAndUpdate(
    {
      memberID: req.params.id,
    },
    { $push: { payments: req.body } },
    {
      new: true,
    }
  )
    .then((doc) => {
      console.log(doc);
      if (!doc) {
        return res.json({ success: false, error: "does not exists" });
      }
      return res.json({ success: true, doc });
    })
    .catch((err) => {
      res.json({ success: false, error: err });
    });
});

//edit
route.put("/update/:id", (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  CanteenModel.findOneAndUpdate(
    {
      memberID: req.params.id,
    },
    req.body,
    {
      new: true,
    }
  )
    .then((doc) => {
      console.log(doc);
      if (!doc) {
        return res.json({ success: false, error: "does not exists" });
      }
      return res.json({ success: true, doc });
    })
    .catch((err) => {
      res.json({ success: false, error: err });
    });
});

//delete
route.delete("/delete/:id", (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  CanteenModel.findOneAndRemove({
    memberID: req.params.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed" });
    });
});

module.exports = route;
