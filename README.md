# json-requester 
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image] [![Coverage Status][coveralls-image]][coveralls-url]

A wrapper library to interact with JSON APIs


## Install

```bash
$ npm install --save json-requester
```


## Usage

```javascript
var jsonRequester = require('json-requester');
var options = {
  uri: 'http://isaacs.iriscouch.com/registry/_all_docs?include_docs=true&limit=10',
  jsonStreamPath: 'rows.*.doc',
  filter: ['name', 'versions']
};
var req = jsonRequester(options, function(err, data) {
  console.log(data);
});
```


## License

Copyright (c) 2014 Stefan Buck. Licensed under the MIT license.



[npm-url]: https://npmjs.org/package/json-requester
[npm-image]: https://badge.fury.io/js/json-requester.svg
[travis-url]: https://travis-ci.org/stefanbuck/json-requester
[travis-image]: https://travis-ci.org/stefanbuck/json-requester.svg?branch=master
[daviddm-url]: https://david-dm.org/stefanbuck/json-requester.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/stefanbuck/json-requester
[coveralls-url]: https://coveralls.io/r/stefanbuck/json-requester
[coveralls-image]: https://coveralls.io/repos/stefanbuck/json-requester/badge.png
