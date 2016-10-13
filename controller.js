'use strict';

const express = require('express');
const router = express.Router();
const db = require('./models/index.js');

exports.getLatest = function (req, res) {
  db.Message.findAll() // fer que surtin nomes 5!
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.sendStatus(500);
    });
};

exports.post = function (req, res) {
  db.Message.create({ content: req.body.content, timestamp: Date.now() }) 
    .then (function (data) {
      res.json(data);
    })
    .catch (function (err) {
      res.sendStatus(500); 
    });  
};

exports.getUsers = function (req, res) {
  db.User.findAll()
    .then (function (data) {
      res.json(data);
    })
    .catch (function (err) {
      res.sendStatus(500);
    });
};