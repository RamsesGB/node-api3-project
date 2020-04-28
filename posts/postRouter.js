const express = require('express');

const router = express.Router();
const Post = require('./postDb.js');

router.get('/', (req, res) => {
  Post.get()
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: "Server error. Unable to retrieve posts"})
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Post.getById( id )
  .then(post => {
    res.status(200).json(post)
  })
  .catch(err => {
    res.status(500).json({message: "Server error. Unable to retrieve posts"})
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Post.remove( id )
  .then(deletedPost => {
    res.status(200).json(deletedPost)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({message: "Server error. Unable to delete post"})
  })
});

router.put('/:id', (req, res) => {
  const { id } = req.params

  Post.update( id, req.body)
  .then(updatedPost => {
    res.status(200).json(updatedPost)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: "Server error. Unable to update post"})
  });
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
