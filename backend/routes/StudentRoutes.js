const express = require("express");
const StudentModel = require("../models/StudentModel");
const CourseModel = require("../models/CoursesModel");
const bcrypt = require("bcrypt");
const { login, changePassword } = require("../middlewares/validate");
const { stringtoLowerCaseSpace } = require("../middlewares/utils");
const { role } = require("../middlewares/variables");
const ClassesModel = require("../models/ClassesModel");
const FeesModel = require("../models/FeesModel");
const TransactionsModel = require("../models/TransactionsModel");

const route = express.Router();

//get all students
route.get("/", async (req, res) => {
  const data = await StudentModel.find({
    role: role.Student,
    "past.status": false,
  }).sort({
    createdAt: "desc",
  });
  let docs = data.filter((e) => e.withdraw === false);
  res.json(docs);
});

//withdraw
route.get("/withdraw", async (req, res) => {
  const data = await StudentModel.find({
    role: role.Student,
  });
  let docs = data.filter((e) => e.withdraw === true);
  res.json(docs);
});

route.get("/past", async (req, res) => {
  const data = await StudentModel.find({
    role: role.Student,
    "past.status": true,
  });

  res.json(data);
});

//unpaid fees
route.get("/unpaidfees/:year/:term", async (req, res) => {
  const docs = await TransactionsModel.find({
    category: { $regex: "fees" },
    type: "income",
    "fees.term": req.params.term,
    "fees.academicYear": req.params.year,
  });

  const feesData = await FeesModel.find();

  let data = docs.map((e) => {
    return {
      amount: e?.amount,
      userID: e?.fees.userID,
      bank: e.bank,
      type: e.type,
      year: e.fees.academicYear,
      term: e.fees.term,
      _id: e._id,
    };
  });
  const students = await StudentModel.find({ role: role.Student });
  let results = students.map((e) => {
    let fees = data.find((i) => i.userID === e.userID);
    let thisfees = feesData.find((i) => i.code === e.classID);

    let type = thisfees[e.status];
    let bill;
    if (type) {
      bill = Object.values(type).reduce(
        (t, value) => Number(t) + Number(value),
        0
      );
    }
    return {
      userID: e.userID,
      campus: e.campus,
      name: e.name + " " + e.surname,
      classID: e.classID,
      amount: fees?.amount || 0,
      academicYear: req.params.year,
      term: req.params.term,
      status: e?.status,
      fees: bill,
    };
  });

  res.json(results);
});

//get one student by id
route.get("/student/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  await StudentModel.findOne({ userID: req.params.id, role: role.Student })
    .then((user) => {
      if (user) {
        return res.json({ success: true, student: user });
      } else {
        return res.json({ success: false, error: "Student does not exists" });
      }
    })
    .catch((err) => {
      return res.json({ success: false, error: "WRONG error" });
    });
});

//admission
route.get("/student/admission/:from/:to", async (req, res) => {
  const admission = await StudentModel.countDocuments({
    role: role.Student,
    createdAt: { $gte: req.params.from, $lte: req.params.to },
  });
  const border = await StudentModel.countDocuments({
    role: role.Student,
    createdAt: { $gte: req.params.from, $lte: req.params.to },
    status: "border",
  });
  const day = await StudentModel.countDocuments({
    role: role.Student,
    createdAt: { $gte: req.params.from, $lte: req.params.to },
    status: "day",
  });

  res.json({
    admission,
    border,
    day,
  });
});

//get studentCourses
route.get("/student/courses/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  await StudentModel.findOne({ userID: req.params.id, role: role.Student })
    .then(async (user) => {
      if (user) {
        await CourseModel.find({ code: user?.classID });
        return res.json({ success: true, courses: user?.courses });
      } else {
        return res.json({ success: false, error: "Student does not exists" });
      }
    })
    .catch((err) => {
      return res.json({ success: false, error: "WRONG error" });
    });
});

//get category num
route.get("/number/:category/:value", async (req, res) => {
  await StudentModel.find({
    role: role.Student,
    [req.params.category]: req.params.value,
  })
    .then((user) => {
      return res.json({
        success: true,
        docs: user.map((e) => {
          return {
            status: e.status,
            fees: e.fees,
          };
        }),
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({ success: false, error: "WRONG error" });
    });
});

//search students by id or name
route.get("/search/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  await StudentModel.find({
    role: role.Student,
    $or: [
      {
        userID: req.params.id,
      },
      {
        name: { $regex: req.params.id },
      },
      {
        lastname: { $regex: req.params.id },
      },
    ],
  })
    .then((user) => {
      if (user) {
        return res.json({ success: true, users: user });
      } else {
        return res.json({ success: false, error: "Student does not exists" });
      }
    })
    .catch((err) => {
      return res.json({ success: false, error: "WRONG error" });
    });
});

//search students by id or name
route.get("/search/:id/:name/:classID", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  await StudentModel.find({
    role: role.Student,
    $or: [
      {
        userID: { $regex: req.params.userID },
      },
      {
        name: { $regex: req.params.name },
      },
      {
        classID: req.params.classID,
      },
    ],
  })
    .then((user) => {
      if (user) {
        return res.json({ success: true, users: user });
      } else {
        return res.json({ success: false, error: "Student does not exists" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.json({ success: false, error: "WRONG error" });
    });
});

//get all parents
route.get("/parents", async (req, res) => {
  await StudentModel.find({ role: role.Student })
    .then((user) => {
      if (user) {
        let results = user.map((a) => a.guadian);
        var merged = [].concat.apply([], results);
        return res.json({ success: true, docs: merged });
      } else {
        return res.json({
          success: false,
          error: "No parents details available",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.json({ success: false, error: "WRONG error" });
    });
});

//search parents
route.get("/parents/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  await StudentModel.findOne({ _id: req.params.id })
    .then((user) => {
      if (user.guadian?.length > 0) {
        return res.json({ success: true, docs: user.guadian });
      } else {
        return res.json({
          success: false,
          error: "No parents details available",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.json({ success: false, error: "WRONG ERROR" });
    });
});

//get students in class
route.get("/class/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  await StudentModel.find({ classID: req.params.id, role: role.Student })
    .then((user) => {
      if (user.length > 0) {
        let enrolledStudents = user.filter((e) => e.withdraw !== true);
        return res.json({ success: true, users: enrolledStudents });
      } else {
        return res.json({ success: false, error: "No Students in this class" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.json({ success: false, error: "Server error" });
    });
});

//student class
route.get("/student/class/:id/:userID", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  await StudentModel.find({ userID: req.params.userID, classID: req.params.id })
    .then((user) => {
      if (user.length > 0) {
        return res.json({ success: true, users: user });
      } else {
        return res.json({ success: false, error: "No Students in this class" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.json({ success: false, error: "Server error" });
    });
});

//get students by gender, section , dormitory

//create student
route.post("/create", async (req, res) => {
  let body = req.body;

  const studentExist = await StudentModel.findOne({
    $and: [
      {
        name: body.name,
        surname: body.surname,
        role: role.Student,
      },
    ],
  });
  if (studentExist) {
    return res.json({ success: false, error: "Student already exist" });
  }

  const teacherExist = await StudentModel.findOne({
    email: body.email,
  });
  if (teacherExist) {
    return res.json({ success: false, error: "Email already exists" });
  }

  const teachertelephoneExist = await StudentModel.findOne({
    telephone: body.telephone,
  });
  if (teachertelephoneExist) {
    return res.json({
      success: false,
      error: "Telephone number  already exists",
    });
  }

  //calculate student num
  const currentYear = new Date().getFullYear();
  const number = await StudentModel.countDocuments({ role: role.Student });
  let studentId = "BK" + currentYear + (number + 1);

  //check if userid exist
  const studentIDexist = await StudentModel.findOne({ userID: studentId });
  if (studentIDexist) {
    studentId = "BK" + currentYear + (number + 2);
  }

  let setuserID = body.setuserID;

  bcrypt.hash(studentId, 10, (err, hash) => {
    if (err) {
      return res.json({ success: false, error: "something went wrong" });
    }
    const userData = {
      ...body,
      password: hash,
      userID: setuserID ? setuserID : studentId,
    };
    StudentModel.create(userData)
      .then((user) => {
        return res.json({ success: true, student: user });
      })
      .catch((e) => {
        console.log(e);
        return res.json({ success: false, error: "something went wrong" });
      });
  });
});

//login
route.post("/signin", async (req, res) => {
  let body = req.body;
  body = {
    ...body,
    role: stringtoLowerCaseSpace(body.role),
  };
  const { error } = login.validate(body);
  if (error) {
    return res.send({ error: error.details[0].message });
  }
  StudentModel.findOne({
    userID: body.userID,
    role: body.role,
  })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          return res.json({ success: true, student: user });
        } else {
          return res.json({ error: "Wrong Password or Student ID" });
        }
      } else {
        return res.json({ error: "Wrong Password or Student ID" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

//update profile pic

//change password
route.put("/changePassword/:id", async (req, res) => {
  const { error } = changePassword.validate(req.body);
  if (error) {
    return res.json({ success: false, error: error.details[0].message });
  }
  StudentModel.findOne({ userID: req.params.id }).then((user) => {
    if (user) {
      if (bcrypt.compareSync(req.body.oldPassword, user.password)) {
        bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
          if (err) {
            return res.json({ success: false, error: err });
          }
          StudentModel.findOneAndUpdate(
            {
              studentID: req.params.id,
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
              return res.json({ success: false, error: e + "e" });
            });
        });
      } else {
        return res.json({ success: false, error: "Wrong old password" });
      }
    } else {
      return res.json({ success: false, error: "Student does not exist" });
    }
  });
});

route.put("/readmit/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  StudentModel.findOneAndUpdate(
    {
      userID: req.params.id,
    },
    { classID: req.body.classID, "past.status": false },
    {
      new: true,
    }
  )
    .then((doc) => {
      if (!doc) {
        return res.json({ success: false, error: "doex not exists" });
      }
      return res.json({ success: true, student: doc });
    })
    .catch((err) => {
      res.json({ success: false, error: err });
    });
});

//update info
//address, nextof kin , classes, courses
//change password
route.put("/update/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  let body = req.body;
  const teacherExist = await StudentModel.findOne({
    email: body.email,
  });
  if (teacherExist && teacherExist.userID !== req.params.id) {
    return res.json({
      success: false,
      error: "Email already used by another account",
    });
  }

  const teachertelephoneExist = await StudentModel.findOne({
    telephone: body.telephone,
  });
  if (teachertelephoneExist && teachertelephoneExist.userID !== req.params.id) {
    return res.json({
      success: false,
      error: "Telephone number is already used by another account",
    });
  }
  StudentModel.findOneAndUpdate(
    {
      userID: req.params.id,
    },
    req.body,
    {
      new: true,
    }
  )
    .then((doc) => {
      if (!doc) {
        return res.json({ success: false, error: "doex not exists" });
      }
      return res.json({ success: true, student: doc });
    })
    .catch((err) => {
      res.json({ success: false, error: err });
    });
});

//change students class
route.post("/upgrade/class", (req, res) => {
  const { currentclass, nextclass } = req.body;
  StudentModel.updateMany(
    {
      role: role.Student,
      classID: currentclass,
    },
    { classID: nextclass }
  )
    .then((doc) => {
      if (!doc) {
        return res.json({ success: false, error: "doex not exists" });
      }

      return res.json({ success: true, student: doc });
    })
    .catch((err) => {
      res.json({ success: false, error: err });
    });
});

//promote graduate  students
route.post("/upgrade/graduate", (req, res) => {
  const { currentclass } = req.body;

  StudentModel.updateMany(
    {
      role: role.Student,
      classID: currentclass,
    },
    { past: { status: true, year: new Date() } }
  )
    .then(async (doc) => {
      if (!doc) {
        return res.json({ success: false, error: "does not exists" });
      }
      await ClassesModel.findOneAndUpdate(
        { classCode: currentclass },
        { past: true }
      );
      return res.json({ success: true, docs: doc });
    })
    .catch((err) => {
      res.json({ success: false, error: err });
    });
});

//change student dormitories
route.post("/upgrade/dormitories", (req, res) => {
  const { currentdormitory, nextdormitory } = req.body;

  StudentModel.updateMany(
    {
      role: role.Student,
      dormitoryID: currentdormitory,
    },
    { dormitoryID: nextdormitory },
    {
      new: true,
    }
  )
    .then((doc) => {
      if (!doc) {
        return res.json({ success: false, error: "class does not exists" });
      }
      return res.json({ success: true, student: doc });
    })
    .catch((err) => {
      res.json({ success: false, error: err });
    });
});

//change student campus
route.post("/upgrade/campus", (req, res) => {
  const { currentcampus, nextcampus } = req.body;

  StudentModel.updateMany(
    {
      role: role.Student,
      campusID: currentcampus,
    },
    { campusID: nextcampus },
    {
      new: true,
    }
  )
    .then((doc) => {
      if (!doc) {
        return res.json({ success: false, error: "doex not exists" });
      }
      return res.json({ success: true, student: doc });
    })
    .catch((err) => {
      res.json({ success: false, error: err });
    });
});

//delete student
route.delete("/delele/:id", (req, res) => {
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

module.exports = route;
