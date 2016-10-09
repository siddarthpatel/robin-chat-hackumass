/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var Grid = require('../../lib/grid'),
    chai = require('chai'),
    expect = chai.expect;

describe('grid', function () {
  describe('instantiate', function () {
    var grid,
        accessToken = 'foo',
        gridUrl = 'http://grid.localhost/v1.0';
    before(function () {
      grid = new Grid(accessToken, gridUrl);
    });
    it('should instantiate without error', function () {
      expect(grid).to.be.an.instanceof(Grid);
    });
  });
  describe('access token', function () {
    var grid,
        accessToken = 'foo',
        gridUrl = 'http://grid.localhost/v1.0';
    before(function () {
      grid = new Grid(accessToken, gridUrl);
    });
    it('should retrieve the access token correctly', function () {
      expect(grid.getAccessToken()).to.equal(accessToken);
    });
  });
  describe('no url', function () {
    var grid,
        accessToken = 'foo';
    it('should throw an error', function () {
      expect(function () {
        grid = new Grid(accessToken);
      }).to.throw(Error);
    });
  });
  describe('event handlers', function () {
    var grid,
        accessToken = 'foo',
        gridUrl = 'http://grid.localhost/v1.0';
    before(function () {
      grid = new Grid(accessToken, gridUrl);
      grid.setupGridMessageHandler();
    });
    it('should emit an error', function (done) {
      grid.on('error', function (err) {
        done();
      });
      grid.gridClient.emit('transport:down');
    });
  });
  describe('incoming messages', function () {
    var grid,
        accessToken = 'foo',
        gridUrl = 'http://grid.localhost/v1.0';
    before(function () {
      grid = new Grid(accessToken, gridUrl);
      grid.setupGridMessageHandler();
    });
    it('should throw an error on an empty message', function (done) {
      var message = {};
      grid.gridClient._extensions[0].incoming(message, function (message) {
        expect(message).to.have.property('error');
        done();
      });
    });
    it('should throw an error on an invalid message', function (done) {
      var message = {
        channel: '/foo/bar',
        data: {}
      };
      grid.gridClient._extensions[0].incoming(message, function (message) {
        expect(message).to.have.property('error');
        done();
      });
    });
  });
  describe('outgoing messages', function () {
    var grid,
        accessToken = 'foo',
        gridUrl = 'http://grid.localhost/v1.0';
    before(function () {
      grid = new Grid(accessToken, gridUrl);
      grid.setupGridMessageHandler();
    });
    it('should have an `ext` field with an empty message', function (done) {
      var message = {};
      grid.gridClient._extensions[0].outgoing(message, function (message) {
        expect(message).to.have.property('ext');
        done();
      });
    });
  });
});
