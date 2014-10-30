'use strict';

var express = require('express');
var config = require('../../config/environment');
if (config.usedDb === 'dynamo') {
  var controller = require('./container.controller.dynamo');
} else {
  var controller = require('./container.controller');
}

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
