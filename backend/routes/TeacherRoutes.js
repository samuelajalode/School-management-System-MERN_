const express = require("express");
const TeacherModel = require("../models/TeacherModel");
const { login } = require("../middlewares/validate");
const bcrypt = require("bcrypt");
const { stringtoLowerCaseSpace, stringSpace } = require("../middlewares/utils");
const { role } = require("../middlewares/variables");
const Payrow = require("../models/PayRow.Model");

const route = express.Router();

//all teachers
route.get("/", async (req, res) => {
  const data = await TeacherModel.find({ isStaff: true }).sort({
    createdAt: "desc",
  });
  res.json(data);
});

route.get("/teachers", async (req, res) => {
  const data = await TeacherModel.find({ role: role.Teacher }).sort({
    createdAt: "desc",
  });
  res.json(data);
});

//get one teacher by id
route.get("/:id", async (req, res) => {
  await TeacherModel.findOne({ userID: req.params.id })
    .then((user) => {
      if (user) {
        return res.json({ success: true, teacher: user });
      } else {
        return res.json({ success: false, error: "Staff does not exists" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.json({ success: false, error: "Server error" });
    });
});

//get teacher bank details
route.get("/bank/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }

  const getSalary = async (id) => {
    let data = await Payrow.findOne({ code: id });
    // console.log(data);
    if (data) {
      let salary =
        Number(data?.salary) + Number(data?.allowance) + Number(data?.bonus);
      console.log(salary);
      return salary;
    }
    return 0;
  };

  await TeacherModel.find({ isStaff: true, bank: req.params.id })
    .then((users) => {
      let data = users?.map((e) => {
        return {
          bank: e.bank,
          name: e.name + " " + e.surname,
          accountNumber: e.accountNumber,
          salary: getSalary(e.position),
          _id: e._id,
        };
      });
      return res.json({ success: true, docs: data || [] });
    })
    .catch((err) => {
      console.log(err);
      return res.json({ success: false, error: "Server error" });
    });
});

//get teacher courses
route.get("/courses/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  await TeacherModel.findOne({ userID: req.params.id, role: role.Teacher })
    .then((user) => {
      if (user) {
        return res.json({ success: true, docs: user?.courses });
      } else {
        return res.json({ success: false, error: "Teacher does not exists" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.json({ success: false, error: "Server error" });
    });
});

//create
route.post("/create", async (req, res) => {
  let body = req.body;
  body = {
    ...body,
    name: body?.name,
    surname: body?.surname,
    email: body?.email,
    role: body.position,
    gender: stringtoLowerCaseSpace(body?.gender),
    telephone: stringSpace(body?.telephone),
  };
  const teacherExist = await TeacherModel.findOne({
    email: body.email,
  });
  if (teacherExist) {
    return res.json({ success: false, error: "Email already exists" });
  }

  const teachertelephoneExist = await TeacherModel.findOne({
    telephone: body.telephone,
  });
  if (teachertelephoneExist) {
    return res.json({ success: false, error: "Telephone  already exists" });
  }

  //calculate teacher
  const currentYear = new Date().getFullYear();
  const number = await TeacherModel.countDocuments({ role: role.Teacher });
  let userID = "TK" + currentYear + (number + 1);

  const usersIDExist = await TeacherModel.findOne({
    userID: userID,
  });

  if (usersIDExist) {
    userID = userID + 1;
    // return res.json({ success: false, error: "UserID  already exists" });
  }

  bcrypt.hash(userID, 10, (err, hash) => {
    if (err) {
      console.log(err, "err");
      return res.json({ success: false, error: "something went wrong" });
    }
    const userData = {
      ...body,
      password: hash,
      userID: userID,
    };
    TeacherModel.create(userData)
      .then((user) => {
        return res.json({ success: true, teacher: user });
      })
      .catch((e) => {
        console.log(e, "e");
        return res.json({ success: false, error: "something went wrong" });
      });
  });
});

//login
route.post("/signin", async (req, res) => {
  const { error } = login.validate(req.body);
  if (error) {
    return res.send({ error: error.details[0].message });
  }
  TeacherModel.findOne({
    userID: req.body.userID,
    role: stringtoLowerCaseSpace(req.body.role),
  })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          return res.json({ success: true, user });
        } else {
          return res.json({ error: "Wrong Password or Teacher ID" });
        }
      } else {
        return res.json({ error: "Wrong Password or Teacher ID" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

//change password
route.post("/changePassword/:id", async (req, res) => {
  const { error } = changePassword.validate(req.body);
  if (error) {
    return res.json({ success: false, error: error.details[0].message });
  }

  TeacherModel.findOne({ userID: req.params.id }).then((user) => {
    if (user) {
      if (bcrypt.compareSync(req.body.oldPassword, user.password)) {
        bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
          if (err) {
            console.log("err");
            return res.json({ success: false, error: err });
          }
          TeacherModel.findOneAndUpdate(
            {
              userID: req.params.id,
            },
            { password: hash },
            {
              new: true,
            }
          )
            .then((doc) => {
              return res.json({ success: true, user: doc });
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
      return res.json({ success: false, error: "Teacher does not exist" });
    }
  });
});

//edit
route.put("/update/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  let body = req.body;
  const teacherExist = await TeacherModel.findOne({
    email: body.email,
  });
  if (teacherExist && teacherExist.userID !== req.params.id) {
    return res.json({
      success: false,
      error: "Email already used by another account",
    });
  }

  const teachertelephoneExist = await TeacherModel.findOne({
    telephone: body.telephone,
  });
  if (teachertelephoneExist && teachertelephoneExist.userID !== req.params.id) {
    return res.json({
      success: false,
      error: "Telephone number is already used by another account",
    });
  }
  TeacherModel.findOneAndUpdate(
    {
      userID: req.params.id,
    },
    req.body,
    {
      new: true,
    }
  )
    .then((doc) => {
      if (doc) {
        return res.json({ success: true, doc });
      } else {
        return res.json({ success: false, error: "Error " });
      }
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
  TeacherModel.findOneAndRemove({
    userID: req.params.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = route;
