const express = require('express');
const router = express.Router();
const Users = require('./userDb')
const Posts = require('../posts/postDb');

router.use(express.json());

router.post('/', validateUser, (req, res) => {
  const userBody = req.body;
    Users.insert(userBody)
      .then(user => {
        res.status(201).json(user)
      })
      .catch(error => {
        res.status(500)
          .json({ error: "There was an error while saving the user to the database" })
  });
})



router.post('/:id/posts', validatePost, (req, res) => {
  const id = req.params.id;
  const postText = req.body.text;
  Posts.insert({ text: postText, user_id: id })
    .then(post => {
      res.status(201).json(post)
    })
    .catch(error => {
      res.status(500)
        .json({ error: "The post information could not be saved" })
    })
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

router.get('/:id', validateUserId, (req, res) => {
  Users.getById(req.params.id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => {
      res.status(500)
        .json({ error: `The user with the id ${id} could not be found` })
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  Users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json({ posts })
    })
    .catch(error => {
      res.status(500)
        .json({ error: "Could not retrieve user posts from the database" })
    })
});

router.delete('/:id', (req, res) => {
  Users.remove(req.params.id)
    .then(user => {
      res.status(200)
        .json({ message: "User was removed from the database" })
    })
    .catch(error => {
      res.status(500)
        .json({ error: "Could not remove user from the database" })
    })
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
