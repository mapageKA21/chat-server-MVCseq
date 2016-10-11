'use strict';

const http = require('http');
const express = require('express');

const router = require('./router.js');

const app = express();

app.use(router);
app.use(express.static('static'));

app.use(function (req, res) {
  res.status(404).sendFile(__dirname + '/static/404.html');
});

const hostname = 'localhost';
const port = 3000;

// const server = http.createServer(app);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
