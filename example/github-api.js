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
  uri: 'https://api.github.com/users/stefanbuck/repos',
  filter: ['name', 'url'],
  request: {
    headers: {
      'User-Agent': 'json-requester-example'
    }
  }
};

var req = jsonRequester(options, function(err, data) {
  if(err) {
    console.log(err);
    return;
  }
  console.log(data);
});

req.on('response', function (response) {
    console.log('headers',  response.headers);
    console.log('statusCode',  response.statusCode);
});
