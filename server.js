const express = require('express');
const Users = require('./users/userDb');
// installed helmet; currently not using

const server = express();

server.use(express.json()); // built in middleware
server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url}`
  );
  next();
}


server.use('/api/users', userRouter)

module.exports = server;
