const express = require('express');
const router = express.Router();
const Users = require('./userDb')

router.use(express.json());

router.post('/', (req, res) => {
  const postBody = req.body;
  if(postBody.title && postBody.contents) {
    Users.insert(postBody)
      .then(post => {
        res.status(201).json(post)
      })
      .catch(error => {
        res.status(500)
          .json({ error: "There was an error while saving the post to the database" })
      }) 
  } else {
    res.status(400)
      .json({ errorMessage: "Provide title and contents for the post" })
  }
});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {
  Users.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      res.status(500)
        .json({ error: "The user information could not be retrieved" })
    })
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
