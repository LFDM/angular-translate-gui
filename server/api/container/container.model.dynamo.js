'use strict';

var vogels = require('vogels');


function trslSchema(schema) {
  schema.String('translation');
  schema.String('lang');
  schema.Boolean('dirty', { default: true });
  schema.Date('updatedAt', { default: Date.now  });
}

function valueSchema(schema) {
  schema.UUID('_id');
  schema.String('name');
  schema.String('comment');
  schema.String('exampleUrl');
  schema.String('example');
  schema.Date('createdAt', { default: Date.now  });
  schema.Boolean('dirty', { default: true });
  schema.List('translations', trslSchema);
}

function containerSchema(idOpts) {
  return function(schema) {
    schema.UUID('_id', idOpts);
    schema.String('name');
    schema.String('comment');
    schema.Boolean('dirty', { default: true });
    schema.Date('createdAt', { default: Date.now  });
    schema.List('values', valueSchema);
    schema.List('containers', { default: [] });
  };
}

var Container = vogels.define('Container', containerSchema({
  hashKey: true
}));

Container.createTable(function() {});
module.exports = Container;
