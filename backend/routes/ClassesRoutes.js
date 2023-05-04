const express = require("express");
const ClassesModel = require("../models/ClassesModel");
const { stringtoLowerCaseSpace } = require("../middlewares/utils");
const StudentModel = require("../models/StudentModel");
const { role } = require("../middlewares/variables");
const route = express.Router();

route.get("/", async (req, res) => {
  const docs = await ClassesModel.find().sort({
    createdAt: "desc",
  });

  let data = docs.filter((e) => e.past !== true);
  res.json(data);
});

route.get("/all", async (req, res) => {
  const docs = await ClassesModel.find().sort({
    createdAt: "desc",
  });
  res.json(docs);
});

route.get("/past", async (req, res) => {
  const docs = await ClassesModel.find().sort({
    createdAt: "desc",
  });
  let classData = docs.map((e) => {
    return e;
  });
  let data = classData.filter((e) => e.past === true);
  res.json(data);
});

//get one by id
route.get("/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  await ClassesModel.findOne({ _id: req.params.id })
    .then((docs) => {
      if (docs) {
        return res.json({ success: true, docs });
      } else {
        return res.json({ success: false, error: "Does not exists" });
      }
    })
    .catch((err) => {
      return res.json({ success: false, error: "Server error" });
    });
});

//teacher ID
route.get("/teacher/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  await ClassesModel.find({ teacherID: req.params.id })
    .then((docs) => {
      if (docs) {
        return res.json({ success: true, docs });
      } else {
        return res.json({ success: false, error: "Does not exists" });
      }
    })
    .catch((err) => {
      return res.json({ success: false, error: "Server error" });
    });
});

//get by classCode
route.get("/classCode/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  await ClassesModel.findOne({ classCode: req.params.id })
    .then((docs) => {
      if (docs) {
        return res.json({ success: true, docs });
      } else {
        return res.json({ success: false, error: "Does not exists" });
      }
    })
    .catch((err) => {
      return res.json({ success: false, error: "Server error" });
    });
});

//get by class name
route.get("/name/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  await ClassesModel.findOne({ name: req.params.id })
    .then((docs) => {
      if (docs) {
        return res.json({ success: true, docs });
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
  //  const {error} = createClass.validate(body);
  //   if(error){
  //       console.log(error, "error")
  //         return  res.json({success: false, error : error.details[0].message})
  //   }
  body = {
    ...body,
    name: body.name,
    classCode: stringtoLowerCaseSpace(body.classCode),
  };

  const classExist = await ClassesModel.findOne({
    classCode: body.classCode,
  });
  if (classExist) {
    return res.json({ success: false, error: "Course already exist" });
  }

  ClassesModel.create(body)
    .then((doc) => {
      console.log(doc);
      res.json({ success: true, doc });
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false, message: err });
    });
});

//edit
route.put("/update/:id", (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  ClassesModel.findOneAndUpdate(
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
      res.json({ success: false, error: err });
    });
});

//delete
route.delete("/delete/:id", (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  ClassesModel.findOneAndRemove({
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
