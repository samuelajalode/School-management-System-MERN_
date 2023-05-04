const express = require("express");
const AttendanceModel = require("../models/AttendenceModel");
const { startAttendance } = require("../middlewares/validate");

const route = express.Router();

//get attendance
route.get("/", async (req, res) => {
  const docs = await AttendanceModel.find().sort({
    createdAt: "desc",
  });
  res.json(docs);
});

// all students attendance or staff
route.get("/:id", async (req, res) => {
  const docs = await AttendanceModel.find({ role: req.params.id });
  res.json(docs);
});

route.get("/:id", async (req, res) => {
  const docs = await AttendanceModel.find({ role: req.params.id });
  res.json(docs);
});

//get One  student attendance data
route.get("/user/:id", async (req, res) => {
  const docs = await AttendanceModel.find({ "users.userID": req.params.id });
  res.json(docs);
});

//attendance by day doc
route.get("/attendance/:id", async (req, res) => {
  const docs = await AttendanceModel.findOne({ _id: req.params.id });
  res.json(docs);
});

//attendance by class

//all staff attendace

//staff attendance by date

//each student  records
route.post("/register", async (req, res) => {
  const users = req.body.users;
  const classID = req.body.classID;
  const role = req.body.role;

  const now = new Date();
  var start = new Date();
  start.setHours(0, 0, 0, 0);

  var end = new Date();
  end.setHours(23, 59, 59, 999);
  //check if exist
  let isExist = await AttendanceModel.findOne({
    classID: classID,
    createdAt: {
      $gte: start,
      $lt: end,
    },
  });

  console.log(isExist, "isExist");
  if (isExist) {
    AttendanceModel.updateOne(
      { _id: isExist?._id },
      {
        users,
      }
    )
      .then((docs) => {
        console.log("already exists");
        return res.json({ success: true, docs });
      })
      .catch((err) => {
        console.log(err);
        return res.json({ success: false, error: "something when wrong" });
      });
  } else {
    AttendanceModel.create({
      classID,
      users: users,
      role,
    })
      .then((data) => {
        if (data) {
          return res.json({ success: true, docs: data });
        } else {
          return res.json({ success: false, error: "something when wrong" });
        }
      })
      .catch((err) => {
        return res.json({ success: false, error: "Failed !" });
      });
  }
});

// record start time
route.post("/start/:id", async (req, res) => {
  if (!req.params.id) {
    return res.json({
      success: false,
      error: "Missing URL parameter: username",
    });
  }

  let body = req.body;
  const { error } = startAttendance.validate(body);

  if (error) {
    console.log(error);
    return res.json({ success: false, error: error.details[0].message });
  }

  //check whether already exist
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const isExist = await AttendanceModel.findOne({
    userID: req.params.id,
    date: { $gte: today },
  }).exec();
  if (isExist) {
    return res.json({ success: false, error: "Already Registered" });
  }

  AttendanceModel.create({
    userID: req.params.id,
    startLocation: req.body.startLocation,
  })
    .then((doc) => {
      res.json({ success: true, doc });
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false, error: err });
    });
});

//update class register
route.put("/update/:id", async (req, res) => {
  AttendanceModel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      users: req.body.users,
    },
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

module.exports = route;
