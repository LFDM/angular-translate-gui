var importDir = process.argv[2];
var mainLang  = process.argv[3] || 'en';

if (!importDir) {
  console.log('No directory path given. Aborting!');
  process.exit();
}

var fs = require('fs');
var _  = require('lodash');
var uuid = require('node-uuid');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('../../config/environment');

var withoutNamespace = new Container('withoutNamespace');
var top = { containers: [ withoutNamespace ] };

console.log("Reading files form "+ importDir);

function parseFiles() {
  var paths = fs.readdirSync(importDir);
  paths.forEach(function(path) {
    var fullPath = importDir + '/' + path;
    var content = JSON.parse(fs.readFileSync(fullPath));
    var lang = path.slice(0, -5);

    // Special handling for top level properties, which get assigned to a
    // container called `withoutNamespace`.
    // All other properties are recursively added.
    var withSubLevels = {}

    for (var key in content) {
      var val = content[key];
      if (typeof val === 'string') {
        addValToContainer(withoutNamespace, key, val, lang);
      } else {
        withSubLevels[key] = val;
      }
    }

    parseContent(top, withSubLevels, lang);
  });
}

function parseContent(container, content, lang) {
  for (var key in content) {
    var val = content[key];
    var cont;
    if (typeof val === 'string') {
      addValToContainer(container, key, val, lang);
    } else {
      cont = getContainer(container, key);
      parseContent(cont, val, lang);
    }
  }
}

function addId(obj) {
  if (usingDynamo()) obj._id = uuid.v4();
}

function Container(name) {
  this.name = name;
  this.containers = [];
  this.values = [];
}

// When using MongoDb Value and Translation will get their IDs assigned
// automatically as they are sub-document models.
// We don't get this behaviour with DynamoDB, therefore we generate
// UIIDs ourselves.

function Value(name) {
  this.name = name;
  this.translations = [];
  this.dirty = true;
  addId(this);
}

function Translation(translation, lang) {
  this.translation = translation;
  this.lang = lang;
  this.dirty = lang !== mainLang;
  addId(this);
}

function getContainer(parent, name) {
  var conts = parent.containers;
  var cont = _.find(conts, function(el) {
    return el.name === name;
  });
  if (!cont) {
    cont = new Container(name);
    conts.push(cont);
  }
  return cont;
}

function addValToContainer(container, val, trsl, lang) {
  var values = container.values;
  var value = _.find(values, function(el) {
    return el.name === val;
  })
  if (!value) {
    value = new Value(val);
    values.push(value);
  }
  value.translations.push(new Translation(trsl, lang));
}

function seedMongoDb() {
  var mongoose = require('mongoose');
  var ContainerModel = require('../../api/container/container.model')

  mongoose.connect(config.mongo.uri, config.mongo.options);
  ContainerModel.create(top.containers);
  mongoose.disconnect();
}

function seedDynamoDb() {
  var vogels = require('vogels');
  var ContainerModel = require('../../api/container/container.model.dynamo')

  vogels.AWS.config.loadFromPath('.credentials.json')
  if (config.dynamo.local) {
    var dynamodb = new vogels.AWS.DynamoDB({ endpoint: config.dynamo.endpoint });
    vogels.dynamoDriver(dynamodb);
  }

  var noop = function() {};
  for (var i=0; i < top.containers.length; i++) {
    var container = top.containers[i];
    ContainerModel.create(container, noop);
  }
}

function usingDynamo() {
  return config.usedDb === 'dynamo';
}

function seedContainers() {
  if (usingDynamo()) {
    seedDynamoDb();
  } else {
    seedMongoDb();
  }
  console.log('DB seed successful!');
}

parseFiles();
seedContainers();
