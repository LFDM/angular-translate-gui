'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    translations = require('../translation/translation.model');

var ValueSchema = new Schema({
  name: String,
  comment: String,
  exampleUrl: String,
  example: String,
  dirty: { type: Boolean, default: false },
  translations: [ translations.schema ],
});

module.exports = mongoose.model('Value', ValueSchema);
