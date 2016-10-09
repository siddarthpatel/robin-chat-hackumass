/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var Device = require('../../../lib/grid/modules/device'),
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

describe('grid device module', function () {
  describe('instantiate', function () {
    var device;
    it('should throw an error', function () {
      expect(function () {
        device = new Device();
      }).to.throw(Error);
    });
    before(function () {
      device = new Device(grid);
    });
    it('should instantiate correctly', function () {
      expect(device).to.be.instanceof(Device);
    });
  });
  describe('connect', function () {
    var device,
        connection;
    before(function () {
      device = new Device(grid);
    });
    it('should throw an error', function () {
      expect(function () {
        connection = device.connect();
      }).to.throw(Error);
    });
    before(function () {
      connection = device.connect(15);
    });
    it('should instantiate a connection', function () {
      expect(connection).to.be.instanceof(Connection);
    });
  });
});
