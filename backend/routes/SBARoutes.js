const express = require("express");
const SBAModel = require("../models/SBAModel");
const StudentModel = require("../models/StudentModel");
const { role } = require("../middlewares/variables");

const route = express.Router();

route.get("/", async (req, res) => {
  const data = await SBAModel.find().sort({
    createdAt: "desc",
  });
  res.json(data);
});

//get one by id
route.get("/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  await SBAModel.findOne({ _id: req.params.id })
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
route.get("/student/:id/:year/:term", async (req, res) => {
  console.log(req.params);
  SBAModel.find({
    "students.userID": req.params.id,
    term: req.params.term,
    academicYear: req.params.year,
  }).then((docs) => {
    if (!docs) {
      return res.json({ error: "No Data Yet" });
    }
    let arr = [];
    docs.map((e) => {
      arr.push(
        e.students.map((r) => {
          return {
            _id: r._id,
            name: r.name,
            userID: r.userID,
            position: r.position,
            exam: r.exam,
            examPercentage: r.examPercentage,
            classWork: r.classWork,
            classWorkPercentage: r.classWorkPercentage,
            course: e.course,
          };
        })
      );
    });

    console.log(arr);
    var merged = [].concat.apply([], arr);
    let results = merged.filter((i) => i.userID === req.params.id);

    return res.json({ docs: results });
  });
});

//get class student
route.get("/class/:class/:year/:term", async (req, res) => {
  let isExist = await SBAModel.find({
    class: req.params.class,
    academicYear: req.params.year,
    term: req.params.term,
  });
  if (isExist) {
    return res.json({ docs: isExist });
  }
  return res.json({ error: "No Data Yet" });
});

//get class student
route.get("/:class/:year/:term", async (req, res) => {
  let isExist = await SBAModel.findOne({
    class: req.params.class,
    academicYear: req.params.year,
    term: req.params.term,
  });
  if (isExist) {
    return res.json({ docs: isExist });
  }
  return res.json({ error: "No Data Yet" });
});

//get class course
route.get("/:class/:course/:year/:term", async (req, res) => {
  let students = await StudentModel.find({
    classID: req.params.class,
    role: role.Student,
  });

  let isExist = await SBAModel.findOne({
    class: req.params.class,
    course: req.params.course,
    academicYear: req.params.year,
    term: req.params.term,
  });

  if (isExist) {
    let oldStudents = isExist.students;
    let docs = {
      _id: isExist._id,
      academicYear: isExist.academicYear,
      class: isExist.class,
      classWork: isExist.classWork,
      course: isExist.course,
      createdAt: isExist.createdAt,
      exam: isExist.exam,
      examPercentage: isExist.examPercentage,
      classWorkPercentage: isExist.classWorkPercentage,
      students: students.map((e) => {
        let selected = oldStudents.find((i) => i.userID === e.userID);

        return {
          name: e.name + "  " + e.surname,
          userID: e?.userID,
          position: selected?.position || "",
          exam: selected?.exam || "",
          classWork: selected?.classWork || "",
          examPercentage: selected?.examPercentage || "",
          classWorkPercentage: selected?.classWorkPercentage || "",
        };
      }),
    };

    return res.json({ docs });
  }

  SBAModel.create({
    class: req.params.class,
    course: req.params.course,
    academicYear: req.params.year,
    term: req.params.term,
    examPercentage: 70,
    classWorkPercentage: 30,
    students: students.map((e) => {
      return {
        name: e.name + "  " + e.surname,
        userID: e?.userID,
        position: " ",
        exam: " ",
        classWork: "",
        examPercentage: "",
        classWorkPercentage: "",
      };
    }),
  })
    .then((docs) => {
      if (!docs) {
        return res.json({ success: false, error: "doex not exists" });
      }
      return res.json({ success: true, docs });
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false, error: "Failed" });
    });
});

//create
route.post("/create", async (req, res) => {
  let body = req.body;

  SBAModel.create(body)
    .then((doc) => {
      res.json({ success: true, doc });
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false, error: err });
    });
});

//update student marks
route.put("/update/student/:id/:studentID", async (req, res) => {
  const isExist = await SBAModel.findOne({
    _id: req.params.id,
  });

  if (!isExist) {
    return res.json({ error: "SBA not found" });
  }
  SBAModel.findOneAndUpdate(
    {
      "students.userID": req.params.studentID,
      _id: req.params.id,
    },
    { $set: { "students.$": req.body } },
    {
      new: true,
    }
  )
    .then((doc) => {
      console.log(doc);
      if (!doc) {
        SBAModel.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { students: req.body } },
          { new: true }
        ).then((doc) => {
          return res.json({ success: true, doc });
        });
      } else {
        return res.json({ success: true, doc });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false, error: "Edit failed" });
    });
});

//edit task
route.put("/update/:id", (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  SBAModel.findOneAndUpdate(
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
  SBAModel.findOneAndRemove({
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
