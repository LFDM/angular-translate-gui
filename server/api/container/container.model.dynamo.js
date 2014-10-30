'use strict';

var vogels = require('vogels');

var Test = vogels.define('Test', function(schema) {
  schema.UUID('id', { hashKey: true });
  schema.String('name');
  schema.String('comment');
  schema.Boolean('dirty', { default: true });
  schema.List('values');
});

module.exports = Test;
