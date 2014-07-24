/*
* json-requester
* https://github.com/stefanbuck/json-requester
*
* Copyright (c) 2014 Stefan Buck
* Licensed under the MIT license.
*/

'use strict';

var _ = require('lodash');
var reqeust = require('request');
var JSONStream = require('JSONStream');
var es = require('event-stream');

var defaults = {
  jsonStreamPath: '*',
  request: {}
};

module.exports = function(options, cb) {
  options = options || {};
  _.defaults(options, defaults);
  options.request.uri = options.uri;

  var result = [];
  var req = reqeust.get(options.request);
  req.on('error', cb);
  req.on('end', function() {
    cb(null, result);
  });

  req.pipe(JSONStream.parse(options.jsonStreamPath))
  .pipe(es.mapSync(function (item) {
    if (options.filter && Array.isArray(options.filter) ) {
      result.push(_.pick(item, options.filter));
    } else {
      result.push(item);
    }
    return item;
  }));

  return req;
};
