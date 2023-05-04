const express = require("express");
const PaymentPlanModel = require("../models/PaymentPlanModel");
const StudentModel = require("../models/StudentModel");
const { role } = require("../middlewares/variables");
const route = express.Router();

//get all
route.get("/", async (req, res) => {
  const data = await PaymentPlanModel.findOne({ dataID: "paymentPlan" }).sort({
    createdAt: "desc",
  });
  res.json(data);
});

//edit plans
route.put("/update/plans", async (req, res) => {
  PaymentPlanModel.findOneAndUpdate(
    {
      dataID: "paymentPlan",
    },
    { plans: req.body },
    {
      new: true,
    }
  )
    .then(async (doc) => {
      if (!doc) {
        let docs = await PaymentPlanModel.create({
          dataID: "paymentPlan",
          plans: req.body,
        });
        console.log(docs);
        return res.json({ success: true, doc: docs });
      }
      return res.json({ success: true, doc });
    })
    .catch((err) => {
      res.json({ success: false, error: err });
    });
});

//create
route.post("/create", async (req, res) => {
  PaymentPlanModel.create({ dataID: "paymentPlan" })
    .then((doc) => {
      console.log(doc);
      res.json({ success: true, doc });
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false, message: err });
    });
});

//edit services
route.put("/update/services/:id", async (req, res) => {
  PaymentPlanModel.findOneAndUpdate(
    {
      "services._id": req.params.id,
    },
    { $set: { "services.$": req.body } },
    {
      new: true,
    }
  )
    .then((doc) => {
      if (!doc) {
        return res.json({ success: false, error: "does not exists" });
      }
      return res.json({ success: true, doc });
    })
    .catch((err) => {
      res.json({ success: false, error: err });
    });
});

//add service
route.post("/add/service", async (req, res) => {
  let body = req.body;
  console.log(body);
  PaymentPlanModel.findOneAndUpdate(
    { dataID: "paymentPlan" },
    { $push: { services: body } },
    (err, success) => {
      if (err) {
        res.json({ success: false, error: err });
      } else {
        res.json({ success: true, doc: success });
      }
    }
  ).exec();
});

//edit task
route.put("/update/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  PaymentPlanModel.findOneAndUpdate(
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
        PaymentPlanModel.create({ ...req.body, dataID: "paymentPlan" })
          .then((docs) => {
            console.log(docs);
            res.json({ success: true, doc: docs });
          })
          .catch((err) => {
            console.log(err);
            res.json({ success: false, message: err });
          });
      }
      return res.json({ success: true, doc });
    })
    .catch((err) => {
      res.json({ success: false, error: "Failed" });
    });
});

//delete service
route.put("/delete/services/:id", (req, res) => {
  PaymentPlanModel.findOneAndUpdate(
    {
      dataID: "paymentPlan",
    },
    { $pull: { services: { _id: req.params.id } } },
    { safe: true, multi: true }
  )
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = route;
