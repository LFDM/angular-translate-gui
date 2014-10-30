'use strict';

var _ = require('lodash');
var Container = require('./container.model.dynamo');

// Get list of containers
exports.index = function(req, res) {
  Container.scan().exec(function (err, containers) {
    if(err) { return handleError(res, err); }
    return res.json(200, containers.Items.sort(function(a, b) {
      return b.name > a.name;
    }));
  });
};

// Get a single container
exports.show = function(req, res) {
  Container.get(req.params.id, function (err, container) {
    if(err) { return handleError(res, err); }
    if(!container) { return res.send(404); }
    return res.json(container);
  });
};

// Creates a new container in the DB.
exports.create = function(req, res) {
  Container.create(req.body, function(err, container) {
    if(err) { return handleError(res, err); }
    return res.json(201, container);
  });
};

// Updates an existing container in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Container.get(req.params.id, function (err, container) {
    if (err) { return handleError(res, err); }
    if(!container) { return res.send(404); }

    container.attrs = _.extend(container.attrs, req.body);
    console.log(req.body);
    container.update(function(err) {
      if (err) { return handleError(res, err); }
      return res.json(200, container.attrs);
    })
  });
};

// Deletes a container from the DB.
exports.destroy = function(req, res) {
  Container.destroy(req.params.id, function (err, container) {
    if(err) { return handleError(res, err); }
    return res.send(204);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}

