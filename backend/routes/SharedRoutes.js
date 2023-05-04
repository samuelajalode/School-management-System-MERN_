const express = require("express");
const { uploader } = require("../middlewares/multer");
const StudentModel = require("../models/StudentModel");
const AttendanceModel = require("../models/AttendenceModel");
const CoursesModels = require("../models/CoursesModel");
const ClassesModel = require("../models/ClassesModel");
const Campus = require("../models/CampusesModel");
const CalendarModel = require("../models/CalenderModel");
const PrefectsModel = require("../models/PrefectsModel");
const Sections = require("../models/SectionModel");
const NotificationsModel = require("../models/NoticeModel");
const ScholarshipsModels = require("../models/ScholarshipsModel");
const TeacherModels = require("../models/TeacherModel");
const DivisionsModels = require("../models/DivisionModel");
const DepartmentsModels = require("../models/DepartmentsModel");
const { login, changePassword } = require("../middlewares/validate");
const { role } = require("../middlewares/variables");
const moment = require("moment");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const transport = require("../middlewares/Nodemailer");

const dt = new Date();
const month = dt.getMonth();
const year = dt.getFullYear();
const route = express.Router();

route.get("/", async (req, res) => {
  res.send("shared rotes");
});

//staff count
route.get("/staff/count/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  const staff = await TeacherModels.findOne({
    role: role.Teacher,
    userID: req.params.id,
  });

  const notifications = await NotificationsModel.find({
    date: { $gte: new Date() },
  });

  let date = new Date();
  date.setDate(date.getDate() - 30);
  const attendance = await AttendanceModel.find({
    "users.userID": req.params.id,
    date: { $gte: date },
  });

  const docs = await CalendarModel.find({ date: { $gte: date } });

  return res.json({
    success: true,
    count: {
      courses: staff?.courses?.length,
      classes: staff?.classID,
      attendance: attendance?.length,
      notifications: notifications?.length,
      events: docs?.length,
    },
  });
});

//count
route.get("/student/count/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }

  const student = await StudentModel.findOne({
    role: role.Student,
    userID: req.params.id,
  });

  const notifications = await NotificationsModel.find({
    date: { $gte: new Date() },
  });

  let date = new Date();
  var daysInMonth = new Date(year, month + 1, 0).getDate();
  date.setDate(date.getDate() - daysInMonth);
  const attendance = await AttendanceModel.find({
    "users.userID": req.params.id,
    createdAt: { $gte: moment(date, "D-MM-YYYY") },
  });

  const docs = await CalendarModel.find({ date: { $gte: date } });

  return res.json({
    success: true,
    count: {
      courses: student?.courses?.length,
      attendance: attendance?.length,
      notifications: notifications?.length,
      events: docs?.length,
    },
  });
});

route.get("/count", async (req, res) => {
  const students = await StudentModel.countDocuments({ role: role.Student });

  const femaleStudents = await StudentModel.countDocuments({
    role: role.Student,
    gender: "female",
  });
  const maleStudents = await StudentModel.countDocuments({
    role: role.Student,
    gender: "male",
  });

  const studentsData = await StudentModel.find({
    role: role.Student,
  }).exec();

  const staff = await TeacherModels.countDocuments({ isStaff: true });
  const femaleStaff = await TeacherModels.countDocuments({
    gender: "female",
    isStaff: true,
  });
  const maleStaff = await TeacherModels.countDocuments({
    isStaff: true,
    gender: "male",
  });

  const staffData = await TeacherModels.find({
    isStaff: true,
  }).exec();

  //const todayBirthdayStaff = getBirthday(staffData, month, day).length;

  //const yesterdayBirthdayStaff = getBirthday(staffData, month, day - 1).length;

  //const tomorrowBirthdayStaff = getBirthday(staffData, month, day + 1).length;
  const campuses = await Campus.countDocuments();
  const classes = await ClassesModel.countDocuments();
  const prefects = await PrefectsModel.countDocuments();
  const sections = await Sections.countDocuments();
  const courses = await CoursesModels.countDocuments();
  const departments = await DepartmentsModels.countDocuments();
  const scholarships = await ScholarshipsModels.countDocuments();
  const divisions = await DivisionsModels.countDocuments();
  res.json({
    todayBirthdayStudents: 0,
    todayBirthdayStaf: 0,
    yesterdayBirthdayStaff: 0,
    tomorrowBirthdayStaff: 0,
    yesterdayBirthdayStudents: 0,
    todayRegisteredStudents: 0,
    yesterdayRegisteredStudents: 0,
    tomorrowBirthdayStudents: 0,
    students,
    staff,
    campuses,
    divisions,
    scholarships,
    classes,
    courses,
    sections,
    departments,
    prefects,
    femaleStudents,
    maleStudents,
    femaleStaff,
    maleStaff,
  });
});

route.get("/users/search/:id", async (req, res) => {
  const data = await TeacherModels.find({
    $or: [
      { userID: req.params.id },
      { name: { $regex: req.params.id } },
      { surname: { $regex: req.params.id } },
    ],
  });
  res.json(data);
});

route.get("/count/attendance", async (req, res) => {
  var daysInMonth = new Date(year, month + 1, 0).getDate();
  var start = new Date(year, month, 1);
  const today = moment(start, "DD-MM-YYYY").startOf("day");

  let arr = [];
  for (let y = 0; y < daysInMonth; y++) {
    const todayData = await AttendanceModel.find({
      createdAt: {
        $gte: moment(today, "DD-MM-YYYY").add(y, "days"),
        $lte: moment(today, "DD-MM-YYYY").add(y, "days").endOf("day"),
      },
    });
    let num = todayData.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue.users.length;
    }, 0); //
    arr.push({
      date: moment(today, "DD-MM-YYYY").add(y, "days"),
      value: num || 0,
    });
  }

  res.json(arr);
});

route.get("/count/attendance/week/:start", async (req, res) => {
  var start = req.params.start;

  let arr = [];
  for (let y = 1; y <= 7; y++) {
    const todayData = await AttendanceModel.find({
      createdAt: {
        $gte: moment(start, "DD-MM-YYYY").add(y, "days").toDate(),
        $lte: moment(start, "DD-MM-YYYY").add(y, "days").endOf("day").toDate(),
      },
    });
    let num = todayData.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue.users.length;
    }, 0); //
    arr.push({
      date: moment(start, "D-MM-YYYY").add(y, "days").toDate(),
      value: num || 0,
    });
  }

  res.json(arr);
});

// route.post("/upload/", uploader.single("photo"), (req, res) => {
//   try {
//     console.log(req.body.caption);
//     res.send({ path: `${req.file.filename}` });
//   } catch (err) {
//     console.log(err);
//     res.json({ success: false, message: err });
//   }
// });

//get student's class details
route.get("/student/classDetails/:id", (req, res) => {
  let userID = req.params.id;
  if (!userID) {
    return res.json({ success: false, error: "User ID is required" });
  }
  //get user
  const user = StudentModel.findOne({ userID });
  if (!user) {
    return res.json({ success: false, error: "Student Does not exists" });
  }
  const classID = user?.classID;
  if (classID) {
    const classDetails = ClassesModel.findOne({ classCode: classID });
    return res.json({ success: true, class: classDetails });
  }
});

//find user by id
route.get("/user/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  await StudentModel.findOne({ userID: req.params.id })
    .then((user) => {
      if (user) {
        return res.json({ success: true, user });
      } else {
        return res.json({ success: false, error: "User does not exists" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.json({ success: false, error: "WRONG error" });
    });
});

//signin user
route.post("/signin", async (req, res) => {
  let body = req.body;

  const { error } = login.validate(body);
  if (error) {
    return res.send({ error: error.details[0].message, success: false });
  }

  StudentModel.findOne({
    userID: body.userID,
  })
    .then((user) => {
      if (user) {
        if (user.role === role.Student && user.past?.status === true) {
          return res.json({ error: "Wrong Password or  ID" });
        } else if (user.role === role.Student && user.withdraw === true) {
          return res.json({ error: "Wrong Password or  ID" });
        } else if (bcrypt.compareSync(req.body.password, user.password)) {
          console.log(bcrypt.compareSync(req.body.password, user.password));
          return res.json({ success: true, user });
        } else {
          return res.json({ error: "Wrong Password or  ID" });
        }
      } else {
        return res.json({ error: "Wrong Password or  ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.json({ error: "something when wrong" });
    });
});

//upload profile
route.post("/update/profile/:id", async (req, res) => {
  StudentModel.findOneAndUpdate(
    {
      userID: req.params.id,
    },
    req.body,
    { new: true }
  )
    .then((user) => {
      if (user) {
        return res.json({ success: true, user });
      } else {
        return res.json({ error: "something when wrong", success: false });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.json({ error: "something when wrong", success: false });
    });
});

//forget password
route.post("/forgetpassword", async (req, res) => {
  const studentIDexist = await StudentModel.findOne({
    userID: req.body.userID,
  });

  if (!studentIDexist) {
    return res.json({ error: "Wrong userID" });
  }

  if (studentIDexist.email !== req.body.email) {
    return res.json({
      error: "Wrong email",
    });
  }

  const token = crypto.randomBytes(20).toString("hex");

  await StudentModel.findOneAndUpdate(
    {
      userID: req.body.userID,
    },
    {
      resetPassowrdToken: token,
      resetPasswordExpires: Date.now() + 3600000,
    },
    {
      new: true,
    }
  );

  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: studentIDexist.email,
    subject: "Link to reset Password",
    html:
      "<!DOCTYPE html>" +
      "<html><head><title>Appointment</title>" +
      "</head><body>" +
      " <p> You are receiving this because you (or someone else) has requested the reset of your password . \n\n Please click on the following link or paste into your browser within one hour of receiving the it.  </p>" +
      "<a href='" +
      process.env.FRONT_END +
      "/password/reset/" +
      token +
      "'>" +
      process.env.FRONT_END +
      "/password/reset/" +
      token +
      "} </a>" +
      " <br/> <br/>" +
      " <p> If you did not request this , please ignore this email and your password will remain unchanged. </p>" +
      "</body></html>",
  };

  transport.sendMail(mailOptions, (error, data) => {
    if (error) {
      console.log(error);
      return res.send({ error: error.response });
    }
    return res.json(data);
  });
});

//reset password
route.post("/resetpassword", async (req, res) => {
  const isExist = await StudentModel.findOne({
    resetPassowrdToken: req.body.token,
    resetPasswordExpires: {
      $gte: Date.now(),
    },
  });

  if (!isExist) {
    return res.json({ error: "Reset Code expired" });
  }
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, error: err });
    }
    StudentModel.findByIdAndUpdate(
      { _id: isExist._id },
      {
        password: hash,
      },
      {
        new: true,
      }
    ).then((respons) => {
      console.log(respons);
      return res.json({
        success: true,
        user: respons,
      });
    });
  });
});

//change password
route.post("/change/password/:id", async (req, res) => {
  const { error } = changePassword.validate(req.body);
  if (error) {
    return res.json({ success: false, error: error.details[0].message });
  }
  StudentModel.findOne({ userID: req.params.id }).then((user) => {
    if (user) {
      if (bcrypt.compareSync(req.body.oldPassword, user.password)) {
        bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
          if (err) {
            console.log("err");
            return res.json({ success: false, error: err });
          }
          StudentModel.findOneAndUpdate(
            {
              userID: req.params.id,
            },
            { password: hash },
            {
              new: true,
            }
          )
            .then((doc) => {
              return res.json({
                success: true,
                message: "Password successfully changed",
              });
            })
            .catch((e) => {
              console.log("e");
              return res.json({ success: false, error: e + "e" });
            });
        });
      } else {
        return res.json({ success: false, error: "Wrong old password" });
      }
    } else {
      return res.json({ success: false, error: "User  does not exist" });
    }
  });
});

route.delete("/user/delete/:id", (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  StudentModel.findOneAndRemove({
    userID: req.params.id,
  })
    .then((doc) => {
      if (!doc) {
        return;
      }
      return res.json({
        success: true,
        message: ` ${req.params.id} is successfully DELETED`,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

route.delete("/division/delete/id", (req, res) => {
  DepartmentsModel.findOneAndRemove({
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
