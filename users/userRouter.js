const express = require('express');
const router = express.Router();
const Users = require('./users/userDb');

router.use(express.json());

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  Users.getById(req.params.id)
    .then(user => {
      if(user) {
        req.user = user
        res.status(200);
      } else {
        res.status(400).json({
          message: "invalid user id"
        })
      }
    })
    next();
}

function validateUser(req, res, next) {
  const userBody = req.body;
  if(!userBody) {
    res.status(400)
      .json({ message: "missing user data" })
  } else if(!userBody.name){
    res.status(400)
      .json({ message: "missing required name field" })
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  const postBody = req.body;
  if(!postBody) {
    res.status(400)
      .json({ message: "missing post data" })
  } else if(!postBody.text) {
    res.status(400)
      .json({ message: "missing required text field" })
  }
}

module.exports = router;
