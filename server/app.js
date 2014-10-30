/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');

if (config.usedDb === 'dynamo') {
  var vogels = require('vogels');
  var aws = vogels.AWS;

  aws.config.loadFromPath('.credentials.json')

  if (config.dynamo.local) {
    var dynamodb = new aws.DynamoDB({ endpoint: config.dynamo.endpoint });
    vogels.dynamoDriver(dynamodb);
  }
} else {
  var mongoose = require('mongoose');
  mongoose.connect(config.mongo.uri, config.mongo.options);
}


// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
