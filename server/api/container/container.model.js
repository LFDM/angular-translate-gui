'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    values = require('../value/value.model');

var ContainerSchema = new Schema({
  name: String,
  dirty: { type: Boolean, default: true },
  comment: String,
  values: [ values.schema ]
});

ContainerSchema.add({ containers: [ ContainerSchema ]});

module.exports = mongoose.model('Container', ContainerSchema);

