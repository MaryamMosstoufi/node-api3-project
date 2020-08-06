const express = require("express");
const helmet = require("helmet");

const server = express();

server.use(express.json());
server.use(helmet());
// server.use(logger);

const usersRouter = require("./users/userRouter");
const postsRouter = require("./posts/postRouter");

server.use("/api/users", usersRouter);
server.use("/api/posts", postsRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let"s write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  let timeStamp = new Date().toLocaleDateString;
  console.log(`Method: ${req.method} / URL: ${req.url} / Time: ${timeStamp}`);
  next();
}

module.exports = server;
