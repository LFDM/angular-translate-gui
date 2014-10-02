'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ContainerSchema = new Schema({
  name: String,
  dirty: { type: Boolean, default: false },
  containers: [{ type: Schema.Types.ObjectId, ref: 'Container' }]
});

module.exports = mongoose.model('Container', ContainerSchema);

