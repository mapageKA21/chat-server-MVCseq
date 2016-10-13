'use strict';

const http = require('http');
const express = require('express');
const config = require('./config.json');
const router = require('./router.js');
const db = require('./models/index.js');
const app = express();

app.use(router);
app.use(express.static('static'));

app.use(function (req, res) {
  res.status(404).sendFile(__dirname + '/static/404.html');
});

const hostname = config.dev.hostname;
const port = config.dev.port;

db.sequelize
  .sync()
  .then(function () {
    app.listen(config.dev.port, function () {
      console.log('Express server listening on port ' + config.dev.port);
    });
  }).catch(function (e) {
    throw new Error(e);
  });
