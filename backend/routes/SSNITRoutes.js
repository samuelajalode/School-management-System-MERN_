const express = require("express");
const SSNITRoutes = require("../models/SSNITModel");
const TeacherModel = require("../models/TeacherModel");
const PayrowModel = require("../models/PayRow.Model");

const route = express.Router();

route.get("/", async (req, res) => {
  const data = await SSNITRoutes.find().sort({
    createdAt: "desc",
  });
  res.json(data);
});

//get one by id
route.get("/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  await SSNITRoutes.findOne({ _id: req.params.id })
    .then((doc) => {
      if (doc) {
        return res.json({ success: true, doc });
      } else {
        return res.json({ success: false, error: "Does not exists" });
      }
    })
    .catch((err) => {
      return res.json({ success: false, error: "Server error" });
    });
});

//get student results
route.get("/teacher/:year/:month", async (req, res) => {
  console.log(req.params);
  SSNITRoutes.find({
    "teachers.userID": req.params.id,
    month: req.params.term,
    year: req.params.year,
  }).then((docs) => {
    if (!docs) {
      return res.json({ error: "No Data Yet" });
    }
    let arr = [];
    docs.map((e) => {
      arr.push(
        e.teacher.map((r) => {
          return {
            _id: r._id,
            name: r.name,
            userID: r.userID,
            position: r.position,
            salary: r.salary,
            //   SSNITNumber=r.SSNITNumber,
            contribution: r.contribution,
          };
        })
      );
    });
    var merged = [].concat.apply([], arr);
    let results = merged.filter((i) => i.userID === req.params.id);
    return res.json({ docs: results });
  });
});

//get class course
route.get("/teachers/:year/:month", async (req, res) => {
  let teachers = await TeacherModel.find({
    isStaff: true,
  });

  let payrows = await PayrowModel.find();

  let isExist = await SSNITRoutes.findOne({
    year: req.params.year,
    month: req.params.month,
  });

  console.log(teachers);

  if (isExist) {
    let oldTeachers = isExist.teachers;
    let docs = {
      _id: isExist._id,
      year: isExist.year,
      month: isExist.month,
      percentage: isExist.percentage,
      teachers: teachers.map((e) => {
        let selected = oldTeachers.find((i) => i.userID === e.userID);
        return {
          name: e.name + "  " + e.surname,
          userID: e?.userID,
          SSNITNumber: selected?.SSNITNumber,
          position: selected?.position,
          salary: selected?.salary,
          contribution: selected?.contribution,
        };
      }),
    };
    return res.json({ docs });
  } else {
    SSNITRoutes.create({
      year: req.params.year,
      percentage: 5,
      teachers: teachers.map((e) => {
        let selected = payrows.find((i) => i.code === e.role);
        return {
          name: e.name + "  " + e.surname,
          userID: e?.userID,
          position: e.role,
          SSNITNumber: e?.taxNumber,
          salary: selected?.salary,
          contribution: selected?.salary * 0.05,
        };
      }),
    })
      .then((docs) => {
        return res.json({ success: true, docs });
      })
      .catch((err) => {
        console.log(err);
        res.json({ success: false, error: "Failed" });
      });
  }
});

//create
route.post("/create", async (req, res) => {
  let body = req.body;

  SSNITRoutes.create(body)
    .then((doc) => {
      res.json({ success: true, doc });
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false, error: err });
    });
});

//edit task
route.put("/update/:id", (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  SSNITRoutes.findOneAndUpdate(
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
        return res.json({ success: false, error: "doex not exists" });
      }
      return res.json({ success: true, doc });
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false, error: "Edit failed" });
    });
});

//delete task
route.delete("/delete/:id", (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  SSNITRoutes.findOneAndRemove({
    _id: req.params.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = route;
