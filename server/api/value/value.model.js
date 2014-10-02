'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ValueSchema = new Schema({
  name: String,
  comment: String,
  exampleUrl: String,
  example: String,
  dirty: { type: Boolean, default: false },
  translations: [{ type: Schema.Types.ObjectId, ref: 'Translations' }],
});

module.exports = mongoose.model('Value', ValueSchema);
