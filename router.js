'use strict';

const fs = require('fs');
const qs = require('qs');
const router = require('express').Router();
const bodyParser = require('body-parser');

let memory;   //  create
const dbFilePath = './db.json';

try {
  fs.writeFileSync(dbFilePath, JSON.stringify({db: []}), {encoding: 'utf8', flag: 'wx'});
} catch (e) {}

fs.readFile(dbFilePath, 'utf8', function (err, data) {
  memory = JSON.parse(data);
});

function dumpMemoryToDisk () {
  fs.writeFile(dbFilePath, JSON.stringify(memory), function (err) {
    if (err) throw err;
  });
}

setInterval(dumpMemoryToDisk, 10000);

router.get('/messages', function (req, res, next) {
  res.json(memory.db.slice(-10));
  next();
});

router.post('/messages', bodyParser.urlencoded({extended: false}), function (req, res) {
  req.body.timestamp = Date.now();
  memory.db.push(req.body);
  res.json(req.body);
});

module.exports = router;
