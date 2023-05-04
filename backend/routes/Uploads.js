const express = require("express");
const { cloudinary } = require("../middlewares/cloudinary");

const route = express.Router();

route.post("/", async (req, res) => {
  try {
    let timeStamp = new Date();
    timeStamp = timeStamp.toJSON();

    // Set folder for uploads
    let day = timeStamp.substring(0, 10);

    let promise = await cloudinary.v2.uploader.upload(req.body.dataUrl, {
      public_id: `${day}/files-${timeStamp}`,
      tags: "files", // tag
    });
    console.log("finish loading", promise);
    return res.json(promise);
  } catch (err) {
    console.log("err", err);
    res.send({ error: err });
  }
});

module.exports = route;
