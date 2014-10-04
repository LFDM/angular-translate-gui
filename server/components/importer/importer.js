var importDir = process.argv[2];

if (!importDir) {
  console.log('No directory path given. Aborting!');
  process.exit();
}

var apiPath = '../../api/'

var ContainerModel = require(apiPath + 'container/container.model')

var fs = require('fs');
var _  = require('lodash');

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

function Container(name) {
  this.name = name;
  this.containers = [];
  this.values = [];
}

function Value(name) {
  this.name = name;
  this.translations = [];
}

function Translation(translation, lang) {
  this.translation = translation;
  this.lang = lang;
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

parseFiles();
