/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var ApiBase = require('../../lib/api/base'),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    assert,
    expect,
    should;

before(function () {
  chai.use(chaiAsPromised);
  assert = chai.assert;
  expect = chai.expect;
  should = chai.should();
});

describe('api - base', function () {
  describe('instantiate', function () {
    it('should instantiate without error', function () {
      var apiBase = new ApiBase();
      expect(apiBase).to.be.an.instanceof(ApiBase);
    });
  });
  describe('acccess token operations', function () {
    it('should return undefined', function () {
      var apiBase = new ApiBase();
      expect(apiBase.getAccessToken()).to.be.undefined;
    });
    it('should set the correct access token', function () {
      var apiBase = new ApiBase(),
          accessToken = 'foo';
      apiBase.setAccessToken(accessToken);
      expect(apiBase.getAccessToken()).to.equal(accessToken);
    });
  });
  describe('relay identifier operations', function () {
    it('should return undefined', function () {
      var apiBase = new ApiBase();
      expect(apiBase.getRelayIdentifier()).to.be.undefined;
    });
    it('should set the correct relay identifier', function () {
      var apiBase = new ApiBase(),
          relayIdentifier = 'bar';
      apiBase.setRelayIdentifier(relayIdentifier);
      expect(apiBase.getRelayIdentifier()).to.equal(relayIdentifier);
    });
  });
  describe('reject request', function () {
    it('should reject a request', function (done) {
      var apiBase = new ApiBase();
      apiBase.rejectRequest().should.be.rejected.and.notify(done);
    });
  });
  describe('construct path', function () {
    describe('empty string', function () {
      it('should return an empty string', function () {
        var apiBase = new ApiBase();
        expect(apiBase.constructPath()).to.equal('/');
      });
    });
    describe('multiple strings', function () {
      it('should return an empty string', function () {
        var apiBase = new ApiBase();
        expect(apiBase.constructPath('foo', 'bar', 'baz')).to.equal('/foo/bar/baz');
      });
    });
    describe('multiple strings, including empty', function () {
      it('should return an empty string', function () {
        var apiBase = new ApiBase();
        expect(apiBase.constructPath('foo', '', 'bar', '', 'baz')).to.equal('/foo/bar/baz');
      });
    });
  });
});
