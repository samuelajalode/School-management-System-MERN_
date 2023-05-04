const express = require("express");
const PrefectsModel = require("../models/PrefectsModel");
const StudentModel = require("../models/StudentModel");
const { role } = require("../middlewares/variables");
const route = express.Router();

//get all
route.get("/", async (req, res) => {
  //const currentyear = new Date().getFullYear();
  const data = await PrefectsModel.find({}).sort({
    createdAt: "desc",
  });
  //.where("endYear").gt(currentyear);
  res.json(data);
});

//get one by id
route.get("/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  await PrefectsModel.findOne({ userID: req.params.id })
    .then((user) => {
      if (user) {
        return res.json({ success: true, user });
      } else {
        return res.json({ success: false, error: "Does not exists" });
      }
    })
    .catch((err) => {
      return res.json({ success: false, error: "Server error" });
    });
});

//add
route.post("/add", async (req, res) => {
  let body = req.body;

  //check if student exist
  const studentExist = await StudentModel.findOne({
    $and: [
      {
        userID: req.body.userID,
        role: role.Student,
      },
    ],
  });
  if (!studentExist) {
    return res.json({ success: false, error: "Student  ID does not exist" });
  }

  //already a prefect
  const prefectExist = await PrefectsModel.findOne({
    userID: req.body.userID,
  });
  console.log(prefectExist);
  if (prefectExist) {
    return res.json({ success: false, error: "Already a prefect" });
  }

  PrefectsModel.create(body)
    .then((doc) => {
      res.json({ success: true, doc });
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false, error: err });
    });
});

//edit task
route.put("/update/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }

  const studentExist = await StudentModel.findOne({
    $and: [
      {
        userID: req.body.userID,
        role: role.Student,
      },
    ],
  });
  if (!studentExist) {
    return res.json({ success: false, error: "Student ID does not exist" });
  }

  //already a prefect
  // const prefectExist = await PrefectsModel.findOne({
  //     userID: req.body.userID
  // })
  // if(prefectExist){
  //     return res.json({success: false, error: "Already a prefect"})
  // }

  PrefectsModel.findOneAndUpdate(
    {
      userID: req.params.id,
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

//delete task
route.delete("/delete/:id", (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  PrefectsModel.findOneAndRemove({
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
