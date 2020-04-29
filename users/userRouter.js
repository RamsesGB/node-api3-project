const express = require("express");

const router = express.Router();
const User = require("./userDb.js");

router.post("/", (req, res) => {
  User.insert(req.body)
    .then(createdUser => {
      res.status(201).json(createdUser)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Server error. Unable to create user"})
    });
});

router.post("/:id/posts", (req, res) => {
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

router.get("/:id", validateUserId, (req, res) => {
  const { id } = req.params;
  
  User.getById(id)
    .then((user) => {
      console.log(` from GET /:id endpoint \n${JSON.stringify(user)}`)
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "Server error. Unable to retrieve user" });
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  const { id } = req.params;

  User.getUserPosts(id)
    .then((userPosts) => {
      res.status(200).json(userPosts);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "Server error. Unable to retrieve posts" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  User.remove(id)
    .then((user) => {
      res.status(204).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server error. Unable to delete user" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;

  User.update(id, req.body)
  .then(updatedUser => {
    res.status(200).json(updatedUser)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: "Server error. Unable to update user" })
  });
});

//custom middleware

function validateUserId(req, res, next) {
  const {id} = req.params

  User.getById( id )
  .then( user => {
    console.log(` from validation mid-ware`, user)
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(400).json({ message: "invalid user id" })
    }
  })
  .catch( err => {
    console.log(err)
    res.status(500).json({ message: "server error" })
  });
}

function validateUser(req, res, next) {
  // do your magic!
  next();
}

function validatePost(req, res, next) {
  // do your magic!
  next();
}

module.exports = router;