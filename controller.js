'use strict';

const messagesModel = require('./model.js');

exports.getLatest = function (req, res) {
  messagesModel.get(6)
    .then (function (data) {
      res.json(data);
    })
    .catch (function (err) {
      res.sendStatus(500);
    });
};

exports.post = function (req, res) {
  messagesModel.set(req.body.content) 
    .then (function (data) {
      res.json(data);
    })
    .catch (function (err) {
      res.sendStatus(500); 
    });  
};
