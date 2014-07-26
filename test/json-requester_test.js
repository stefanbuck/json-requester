'use strict';

var fs = require('fs');
var path = require('path');
var jsonRequester = require('../lib/json-requester.js');
var assert = require('should');
var sinon = require('sinon');
var request = require('request');

describe('jsonRequester', function () {

  beforeEach(function() {
    sinon.stub(request, 'get', function(params) {
      return fs.createReadStream(path.resolve(__dirname, params.uri));
    });
  });

  afterEach(function() {
    request.get.restore();
  });

  it('list of packages', function(cb) {
    var options = {
      uri: 'response.json'
    };
    jsonRequester(options, function(err, result) {
      request.get.called.should.be.true;
      Object.keys(result).should.have.a.lengthOf(10);
      cb(err);
    });
  });

  it('without a filter', function(cb) {
    var options = {
      uri: 'response.json',
    };
    jsonRequester(options, function(err, result) {
      request.get.called.should.be.true;
      var firstItem = result[0];
      Object.keys(firstItem).should.have.a.lengthOf(8);
      cb(err);
    });
  });

  it('with a filter', function(cb) {
    var options = {
      uri: 'response.json',
      filter: ['name', 'description']
    };
    jsonRequester(options, function(err, result) {
      request.get.called.should.be.true;
      var firstItem = result[0];
      Object.keys(firstItem).should.have.a.lengthOf(2);
      console.log(firstItem);
      cb(err);
    });
  });

  it('call transformer', function(cb) {
    var options = {
      uri: 'response.json',
      transformer: function(item) {
        item.newProp = 'a new property';
        item.name = 'prefix-' + item.name;
        return item;
      }
    };
    jsonRequester(options, function(err, result) {
      request.get.called.should.be.true;
      var firstItem = result[0];
      firstItem.name.should.equal('prefix-in-viewport');
      Object.keys(firstItem).should.have.a.lengthOf(9);
      cb(err);
    });
  });
});
