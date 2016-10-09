/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var Channel = require('../../../lib/grid/modules/channel'),
    Connection = require('../../../lib/grid/connection'),
    Grid = require('../../../lib/grid'),
    chai = require('chai'),
    expect = chai.expect,
    grid;

before(function () {
  var accessToken = 'foo',
      gridUrl = 'http://grid.localhost/v1.0';
  grid = new Grid(accessToken, gridUrl);
});

describe('grid channel module', function () {
  describe('instantiate', function () {
    var channel;
    it('should throw an error', function () {
      expect(function () {
        channel = new Channel();
      }).to.throw(Error);
    });
    before(function () {
      channel = new Channel(grid);
    });
    it('should instantiate correctly', function () {
      expect(channel).to.be.instanceof(Channel);
    });
  });
  describe('connect', function () {
    var channel,
        connection;
    before(function () {
      channel = new Channel(grid);
    });
    it('should throw an error', function () {
      expect(function () {
        connection = channel.connect();
      }).to.throw(Error);
    });
    before(function () {
      connection = channel.connect(15);
    });
    it('should instantiate a connection', function () {
      expect(connection).to.be.instanceof(Connection);
    });
  });
});
