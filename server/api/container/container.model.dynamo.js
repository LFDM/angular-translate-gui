'use strict';

var vogels = require('vogels');

var Container = vogels.define('Container', function(schema) {
  schema.UUID('_id', { hashKey: true });
  schema.String('name');
  schema.String('comment');
  schema.Boolean('dirty', { default: true });
  schema.List('values');
  schema.List('containers');
});

Container.createTable(function() {});
module.exports = Container;
