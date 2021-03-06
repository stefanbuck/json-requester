/*
 * json-requester
 * https://github.com/stefanbuck/json-requester
 *
 * Copyright (c) 2014 Stefan Buck
 * Licensed under the MIT license.
 */

'use strict';

var jsonRequester = require('../');

var options = {
  uri: 'http://isaacs.iriscouch.com/registry/_all_docs?include_docs=true&limit=10',
  jsonStreamPath: 'rows.*.doc',
  filter: ['name', 'description'],
  transformer: function(item) {
    if (item.description) {
      item.description = item.description.slice(0, 30) + ' ...';
    }
    return item;
  }
};

jsonRequester(options, function(err, data) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(data);
});
