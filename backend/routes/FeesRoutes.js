const express = require("express");
const FeesModel = require("../models/FeesModel");
const { stringtoLowerCaseSpace } = require("../middlewares/utils");
const route = express.Router();

//get all fees
route.get("/", async (req, res) => {
  const docs = await FeesModel.find().sort({
    createdAt: "desc",
  });
  res.json(docs);
});

route.get("/types", async (req, res) => {
  const docs = await FeesModel.find();
  let types = docs.map((type) => {
    return {
      name: type.name,
      code: type.code,
    };
  });
  return res.json(types);
});

//get one  fee type
route.get("/type/:name/:type", async (req, res) => {
  if (req.params.name) {
    const doc = await FeesModel.findOne({ code: req.params.name });
    if (doc) {
      let type = doc[req.params.type];
      return res.json(type);
    } else {
      return res.json({ error: "Not Found" });
    }
  }
  return res.json({ error: "Error" });
});

//get one class fees
route.get("/:id", async (req, res) => {
  const doc = await FeesModel.findOne({ _id: req.params.id });
  if (doc) {
    return res.json(doc);
  } else {
    return res.json({ error: "", message: "Bank not found" });
  }
});

route.post("/create", async (req, res) => {
  let code = stringtoLowerCaseSpace(req.body.name);

  let isExist = await FeesModel.findOne({ code: code });

  if (isExist) {
    return res.json({ success: false, error: "Already Exist" });
  }

  FeesModel.create({
    ...req.body,
    code: code,
  })
    .then((docs) => {
      return res.json({ success: true, docs });
    })
    .catch((err) => {
      console.log(err);
      return res.json({ success: false, message: "Something when wrong" });
    });
});

//add fees for class
route.post("/add", async (req, res) => {
  //code
  let code = stringtoLowerCaseSpace(req.body.name);
  //check if exist
  let isExist = await FeesModel.findOne({ code: code });
  if (isExist) {
    FeesModel.findOneAndUpdate({ _id: isExist._id }, req.body, { new: true })
      .then((docs) => {
        if (docs) {
          return res.json({ success: true, docs });
        }
        return res.json({ success: false, error: "Failed" });
      })
      .catch((err) => {
        return res.json({ success: false, error: err });
      });
  } else {
    FeesModel.create({
      ...req.body,
      code: code,
    })
      .then((data) => {
        return res.json({ success: true, docs: data });
      })
      .catch((err) => {
        console.log(err);
        return res.json({ success: false, error: "Something when wrong" });
      });
  }
});

//update by name
route.put("/update/name", async (req, res) => {
  FeesModel.findOneAndUpdate(
    {
      name: req.body.name,
    },
    req.body,
    {
      new: true,
    }
  )
    .then(() => {
      return res.json({ success: true, message: "OK" });
    })
    .catch((err) => {
      return res.json({ success: false, error: err });
    });
});

//delete by name
route.delete("/delete/name", async (req, res) => {
  FeesModel.findOneAndDelete({
    name: req.body.name,
  })
    .then(() => {
      return res.json({ success: true, message: "OK" });
    })
    .catch((err) => {
      return res.json({ success: false, error: err });
    });
});

//update class fees
route.put("/update/:id", async (req, res) => {
  FeesModel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    req.body,
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

//delete  class fees
route.delete("/delete/:id", async (req, res) => {
  FeesModel.findOneAndDelete({
    _id: req.params.id,
  })
    .then((doc) => {
      return res.json({ success: true, message: "OK" });
    })
    .catch((err) => {
      return res.json({ success: false, error: err });
    });
});

module.exports = route;
