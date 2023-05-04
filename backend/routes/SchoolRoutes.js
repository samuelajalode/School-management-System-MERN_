const express = require("express");
const SchoolModel = require("../models/SchoolModel");
const bcrypt = require("bcrypt");
const { login, changePassword } = require("../middlewares/validate");
const { role } = require("../middlewares/variables");

const route = express.Router();

//find user by id
route.get("/", async (req, res) => {
  await SchoolModel.findOne({ role: role.Admin })
    .then((user) => {
      if (user) {
        return res.json(user);
      } else {
        return res.json({ success: false, error: "User does not exists" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.json({ success: false, error: "WRONG error" });
    });
});

//signin user
route.post("/signin", async (req, res) => {
  let body = req.body;

  const { error } = login.validate(body);
  if (error) {
    return res.send({ error: error.details[0].message, success: false });
  }

  SchoolModel.findOne({
    userID: body.userID,
    role: role.Admin,
  })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          return res.json({ success: true, user });
        } else {
          return res.json({ error: "Wrong Password or  ID", success: false });
        }
      } else {
        return res.json({ error: "Wrong Password or  ID", success: false });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.json({ error: "something when wrong", success: false });
    });
});

//upload profile
route.put("/update/:id", async (req, res) => {
  SchoolModel.findOneAndUpdate(
    {
      userID: req.params.id,
      role: role.Admin,
    },
    req.body,
    { new: true }
  )
    .then((user) => {
      if (user) {
        return res.json({ success: true, user });
      } else {
        SchoolModel.create(req.body)
          .then((doc) => {
            return res.json({ success: true, user: doc });
          })
          .catch((e) => {
            console.log(e);
            return res.json({ success: false, error: "something went wrong" });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.json({ error: "something when wrong", success: false });
    });
});

//create student
route.post("/create", async (req, res) => {
  let body = req.body;
  const adminExist = await SchoolModel.findOne({
    $and: [
      {
        role: role.Admin,
      },
    ],
  });
  if (adminExist) {
    return res.json({ success: false, error: "Admin already exist" });
  }
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.json({ success: false, error: "something went wrong" });
    }
    const userData = {
      ...body,
      role: role.Admin,
      password: hash,
      userID: "admin",
    };
    SchoolModel.create(userData)
      .then((user) => {
        return res.json({ success: true, user });
      })
      .catch((e) => {
        console.log(e);
        return res.json({ success: false, error: "something went wrong" });
      });
  });
});

//change password
route.post("/change/password/:id", async (req, res) => {
  const { error } = changePassword.validate(req.body);
  if (error) {
    return res.json({ success: false, error: error.details[0].message });
  }
  SchoolModel.findOne({ userID: req.params.id, role: role.Admin }).then(
    (user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.oldPassword, user.password)) {
          bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
            if (err) {
              console.log("err");
              return res.json({ success: false, error: err });
            }
            SchoolModel.findOneAndUpdate(
              {
                userID: req.params.id,
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
                console.log("e");
                return res.json({ success: false, error: e + "e" });
              });
          });
        } else {
          return res.json({ success: false, error: "Wrong old password" });
        }
      } else {
        return res.json({ success: false, error: "User  does not exist" });
      }
    }
  );
});

module.exports = route;
