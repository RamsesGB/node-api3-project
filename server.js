const express = require('express');
const helmet  = require('helmet');

const server = express();
const userRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter.js');

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('/user', userRouter);
server.use('/post', postRouter);

//custom middleware

function logger(req, res, next) {}

module.exports = server;
