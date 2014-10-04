'use strict';

var _ = require('lodash');
var Dump = require('./dump.model');

// Get list of dumps
exports.index = function(req, res) {
  Dump.find(function (err, dumps) {
    if(err) { return handleError(res, err); }
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