'use strict';

var _ = require('lodash');
var Dump = require('./dump.model');
var AdmZip = require('adm-zip');
var Container = require('../container/container.model')
var objPath = require('object-path');

function addToLang(result, path, trsl, lang) {
  var langContainer = result[lang];
  if (!langContainer) langContainer = result[lang] = {};
  objPath.set(langContainer, path, trsl);
}

function addTranslations(result, path, val) {
  val.translations.forEach(function(trsl) {
    addToLang(result, path, trsl.translation, trsl.lang)
  });
}

function addValues(result, values, path) {
  values.forEach(function(value) {
    path.push(value.name);
    addTranslations(result, path.join('.'), value);
    path.pop();
  });
}

function addContainers(result, containers, path) {
  containers.forEach(function(container) {
    path.push(container.name);
    addValues(result, container.values, path);
    addContainers(result, container.containers, path);
    path.pop();
  });
}

function generateDump(callback) {
  Container.find(function(err, containers) {
    var result = {};

    // Take out the unnamespaced container
    var i = _.findIndex(containers, function(el) {
      return el.name === 'withoutNamespace';
    });
    var woNamespace = containers[i];
    containers.splice(i, 1);

    var path = [];
    addValues(result, woNamespace.values, path);
    addContainers(result, containers, path);

    callback(result)
  });
}

// Get list of dumps
exports.index = function(req, res) {
  Dump.find(function (err, dumps) {
    if(err) { return handleError(res, err); }
    var zip = new AdmZip();
    var data = {
      a: "asdfdsf sdfdsfds ",
      b: 12321,
      c: 2343,
      d: "sdfsdfdsfsd",
      e: {
        f: 34234,
        g: "sdfdsf",
        h: {
          i: [1, 2, 3]
        }
      }
    };
    zip.addFile("data.json", new Buffer(JSON.stringify(data)), "comment about data");
    zip.addFile("data2.json", new Buffer(JSON.stringify(data)), "comment about data2");

    var buffer = zip.toBuffer();
    res.set('Content-Type', 'multipart/x-zip');
    var filename = "data.zip";
    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.send(buffer);
    return res.json(200, dumps);
  });
};

// Get a single dump
exports.show = function(req, res) {
  Dump.findById(req.params.id, function (err, dump) {
    if(err) { return handleError(res, err); }
    if(!dump) { return res.send(404); }
    return res.json(dump);
  });
};

// Creates a new dump in the DB.
exports.create = function(req, res) {
  Dump.create(req.body, function(err, dump) {
    if(err) { return handleError(res, err); }
    return res.json(201, dump);
  });
};

// Updates an existing dump in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Dump.findById(req.params.id, function (err, dump) {
    if (err) { return handleError(res, err); }
    if(!dump) { return res.send(404); }
    var updated = _.merge(dump, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, dump);
    });
  });
};

// Deletes a dump from the DB.
exports.destroy = function(req, res) {
  Dump.findById(req.params.id, function (err, dump) {
    if(err) { return handleError(res, err); }
    if(!dump) { return res.send(404); }
    dump.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
