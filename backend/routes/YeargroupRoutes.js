const express = require("express");
const YearGroupModel = require("../models/YearGroupModel");
const { stringtoLowerCase } = require("../middlewares/utils");
const route = express.Router();

route.get("/", async (req, res) => {
  const data = await YearGroupModel.find().sort({
    createdAt: "desc",
  });
  res.json(data);
});

//create
route.post("/create", async (req, res) => {
  let body = req.body;

  let code = stringtoLowerCase(body.name);

  const departExist = await YearGroupModel.findOne({
    code: code,
    year: body.year,
  });
  if (departExist) {
    return res.json({ success: false, error: "Year Group already exist" });
  }

  YearGroupModel.create({
    ...body,
    code: code,
  })
    .then((doc) => {
      console.log(doc);
      res.json({ success: true, doc });
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false, message: "failed" });
    });
});

//edit
route.put("/update/:id", (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  YearGroupModel.findOneAndUpdate(
    {
      _id: req.params.id,
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
      res.json({ success: false, message: err });
    });
});

//delete
route.delete("/delete/:id", (req, res) => {
  YearGroupModel.findOneAndRemove({
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
