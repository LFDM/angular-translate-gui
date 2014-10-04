var importDir = process.argv[2];

if (!importDir) {
  console.log('No directory path given. Aborting!');
  process.exit();
}

var apiPath = '../../api/'

var ContainerModel = require(apiPath + 'container/container.model')

var fs = require('fs');
var _  = require('lodash');

var top = { containers: [] };

console.log("Reading files form "+ importDir);

function parseFiles() {
  fs.readdir(importDir, function(err, files) {
    files.forEach(function(file) {
      var fullPath = importDir + '/' + file;
      fs.readFile(fullPath, function(er, data) {
        var content = JSON.parse(data);
        var lang = file.slice(0, -5);
        parseContent(top, 'withoutNamespace', content, lang);
      });
    });
  });
}

function parseContent(container, accessor, content, lang) {
  for (var key in content) {
    var val = content[key];
    var cont;
    if (typeof val === 'string') {
      cont = getContainer(container, accessor);
      addValToContainer(cont, key, val, lang);
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
