const express = require("express");
const NotificationsModal = require("../models/NoticeModel");

const route = express.Router();
//get all
route.get("/", async (req, res) => {
  const data = await NotificationsModal.find({
    date: { $gte: new Date() },
  }).sort({
    createdAt: "desc",
  });
  res.json(data);
});

//get past events
route.get("/past", async (req, res) => {
  const data = await NotificationsModal.find({ date: { $lte: new Date() } });
  res.json(data);
});

//get this month events
route.get("/upcoming", async (req, res) => {
  let now = new Date();
  let end = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    30,
    59,
    59
  );
  const data = await NotificationsModal.find({
    date: { $gte: now, $lte: end },
  });
  res.json(data);
});

//search by date
route.get("/date/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  const data = await NotificationsModal.find({ date: { $gte: req.params.id } });
  res.json(data);
});

//search by title

//get one by id
route.get("/title/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }

  await NotificationsModal.find({
    title: { $regex: req.params.id, $options: "i" },
  })
    .then((docs) => {
      if (docs) {
        return res.json({ success: true, docs });
      } else {
        return res.json({ success: false, error: "Does not exists" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.json({ success: false, error: "Server error" });
    });
});

//add notice
route.post("/create", async (req, res) => {
  let body = req.body;

  NotificationsModal.create(body)
    .then((doc) => {
      console.log(doc);
      res.json({ success: true, doc });
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false, error: err });
    });
});

//edit
route.put("/update/:id", (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  NotificationsModal.findOneAndUpdate(
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
  NotificationsModal.findOneAndRemove({
    _id: req.params.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//delete all
route.delete("/delete", (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  NotificationsModal.deleteMany({})
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = route;
