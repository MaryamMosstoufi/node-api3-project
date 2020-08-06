const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  let timeStamp = new Date().toLocaleDateString;
  console.log(`Method: ${req.method} / URL: ${req.url} / Time: ${timeStamp}`);
  next();
}

module.exports = server;
