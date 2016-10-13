'use strict';

const fs = require('fs');
const qs = require('qs');
const router = require('express').Router();
const bodyParser = require('body-parser');
const pg = require('pg');

var config = {
  user: 'admin',
  database: 'cw_chat',
  password: 'admin', 
  max: 10,  
  idleTimeoutMillis: 30000  
};

var pool = new pg.Pool(config);

exports.get = function (num) {
  return new Promise (function (resolve, reject) {
    pool.connect(function (err, client, done) {
      if (err) reject(err);
      client.query('SELECT * FROM messages ORDER BY timestamp desc LIMIT $1', [num], function(err, result) {
        done(); // release the client back to the pool 
        if(err) reject(err);
        resolve(result.rows);
      });
    });
  });
};

exports.set = function (content) {
  return new Promise (function (resolve, reject) { 
    pool.connect(function (err, client, done) {
      if (err) reject(err);
      const timestamp = Date.now();
      client.query('INSERT INTO messages (timestamp, content) VALUES ($1, $2)', [timestamp, content], function(err, result) {
        done(); // release the client back to the pool 
        if(err) reject(err);
        resolve({
          timestamp,
          content
        });
      });
    });
  });
};


// WITH CALLBACK -NO PROMISES-
// exports.get = function (num, cb) {
//   pool.connect(function (err, client, done) {
//     if (err) cb(err);
//     client.query('SELECT * FROM messages ORDER BY timestamp LIMIT $1', [num], function(err, result) {
//       done(); // release the client back to the pool 
//       if(err) cb(err);
//       cb(null, result.rows);
//     });
//   });
// };

// exports.set = function (content, cb) {
//   pool.connect(function (err, client, done) {
//     if (err) cb(err);
//     const timestamp = Date.now();
//     client.query('INSERT INTO messages (timestamp, content) VALUES ($1, $2)', [timestamp, content], function(err, result) {
//       done(); // release the client back to the pool 
//       if(err) cb(err);
//       cb(null, {
//         timestamp,
//         content
//       });
//     });
//   });
// };
