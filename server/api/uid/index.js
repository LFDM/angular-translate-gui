'use strict';

var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

router.get('/', function(req, res) {
  var uid = mongoose.Types.ObjectId();
  return res.json(uid, { uid: uid });
});

module.exports = router;

