/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var Api = require('../../lib/api'),
    chai = require('chai'),
    expect = chai.expect;

describe('api', function () {
  describe('instantiate', function () {
    it('should throw an error', function () {
      var api;
      expect(function () {
        api = new Api();
      }).to.throw(Error);
    });
    it('should throw an error when setting up the Core API', function () {
      var api;
      expect(function () {
        api = new Api('foo');
      }).to.throw(Error);
    });
    it('should throw an error when setting up the Places API', function () {
      var api;
      expect(function () {
        api = new Api('foo', 'bar');
      }).to.throw(Error);
    });
  });
});
