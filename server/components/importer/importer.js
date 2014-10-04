var importDir = process.argv[2];

if (!importDir) {
  console.log('No directory path given. Aborting!');
  process.exit();
}

var apiPath = '../../api/'

var ContainerModel = require(apiPath + 'container/container.model')

var fs = require('fs');
var _  = require('lodash');

var containers = {};

console.log("Reading files form "+ importDir);

function parseFiles() {
  fs.readdir(importDir, function(err, files) {
    files.forEach(function(file) {
      var fullPath = importDir + '/' + file;
      fs.readFile(fullPath, function(er, data) {
        var content = JSON.parse(data);
        var lang = file.slice(0, -5);
        parseFile(containers, 'withoutNamespace', content, lang);
      });
    });
  });
}

function parseFile(container, accessor, content, lang) {
  for (var key in content) {
    var val = content[key];
    if (typeof val === 'string') {
      var cont = getContainer(container, accessor);
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
  var cont = parent[name];
  if (!cont) cont = parent[name] = new Container(name);
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
