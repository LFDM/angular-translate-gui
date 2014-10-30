'use strict';

var express = require('express');
var config = require('../../config/environment');
var router = express.Router();

if (config.usedDb !== 'dynamo') {
  var controller = require('./value.controller');
  router.get('/', controller.index);
  router.get('/:id', controller.show);
  router.post('/', controller.create);
  router.put('/:id', controller.update);
  router.patch('/:id', controller.update);
  router.delete('/:id', controller.destroy);
}

module.exports = router;
