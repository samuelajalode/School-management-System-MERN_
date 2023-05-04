const express = require("express");
const PayrowModel = require("../models/PayRow.Model");

const route = express.Router();

//get all events
route.get("/", async (req, res) => {
  const docs = await PayrowModel.find().sort({
    createdAt: "desc",
  });
  res.json(docs);
});

//search event by name

//get one by id
route.get("/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  await PayrowModel.findOne({ code: req.params.id })
    .then((docs) => {
      if (docs) {
        return res.json({ success: true, docs });
      } else {
        return res.json({ success: false, error: "Does not exists" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.json({ success: false, error: "Server error" });
    });
});

//create
route.post("/add", async (req, res) => {
  let body = req.body;

  let code = req.body.name.toLowerCase();

  const isExist = await PayrowModel.findOne({
    code: code,
  });
  if (isExist) {
    return res.json({ success: false, error: "Position already exist" });
  }

  PayrowModel.create({ ...body, code })
    .then((doc) => {
      res.json({ success: true, doc });
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false, error: err });
    });
});

//edit
route.put("/update/:id", (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  PayrowModel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    req.body,
    {
      new: true,
    }
  )
    .then((doc) => {
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
  PayrowModel.findOneAndRemove({
    _id: req.params.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = route;
