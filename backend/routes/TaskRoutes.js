const express = require("express");
const TaskModel = require("../models/TaskModel");
const { createTask } = require("../middlewares/validate");

const route = express.Router();

route.get("/", async (req, res) => {
  const data = await TaskModel.find().sort({
    createdAt: "desc",
  });
  res.json(data);
});

//get one by id
route.get("/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  await TaskModel.findOne({ _id: req.params.id })
    .then((user) => {
      if (user) {
        return res.json({ success: true, student: user });
      } else {
        return res.json({ success: false, error: "Does not exists" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.json({ success: false, error: "Server error" });
    });
});

//create task
route.post("/create", async (req, res) => {
  let body = req.body;
  const { error } = createTask.validate(body);
  if (error) {
    console.log(error);
    return res.json({ success: false, error: error.details[0].message });
  }

  TaskModel.create(body)
    .then((doc) => {
      res.json({ success: true, doc });
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false, message: err });
    });
});

//change dateline
route.put("/changeDeadline:id", (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  TaskModel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { deadline: req.body.deadline },
    {
      new: true,
    }
  )
    .then((doc) => {
      console.log(doc);
      res.json({ success: true, doc });
    })
    .catch((err) => {
      res.json({ success: false, message: err });
    });
});

//edit task
route.put("/update/:id", (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  TaskModel.findOneAndUpdate(
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
      res.json({ success: false, message: err });
    });
});

//delete task
route.delete("/delete/:id", (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  TaskModel.findOneAndRemove({
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
