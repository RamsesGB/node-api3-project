const express = require("express");

const router = express.Router();
const User = require("./userDb.js");

router.post("/", (req, res) => {});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

router.get("/", (req, res) => {
  User.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "Server error. Unable to retrieve users" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  User.getById(id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "Server error. Unable to retrieve user" });
    });
});

router.get("/:id/posts", (req, res) => {
  const { id } = req.params;

  User.getUserPosts(id)
  .then(userPosts => {
    res.status(200).json(userPosts)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: "Server error. Unable to retrieve posts" })
  });
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
