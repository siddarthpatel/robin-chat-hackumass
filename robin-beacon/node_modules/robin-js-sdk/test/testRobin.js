/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var Robin = require('../robin'),
    chai = require('chai'),
    expect = chai.expect;

describe('robin', function () {
  describe('instantiate', function () {
    it('should throw an error', function () {
      var robin;
      expect(function () {
        robin = new Robin();
      }).to.throw(TypeError);
    });
    it('should instantiate without error', function () {
      var robin = new Robin('SampleAccessToken');
      expect(robin).to.be.an.instanceof(Robin);
      expect(robin.api.Core.getBaseUrl()).to.equal('https://api.robinpowered.com/v1.0');
      expect(robin.api.Places.getBaseUrl()).to.equal('https://apps.robinpowered.com/v1.0');
      expect(robin.grid.getGridUrl()).to.equal('https://grid.robinpowered.com/v1.0');
    });
  });
  describe('relay identifier', function () {
    var robin = new Robin('SampleAccessToken'),
        relayIdentifier = 'foo';
    before(function () {
      robin.setRelayIdentifier(relayIdentifier);
    });
    it('should be the expected api relay identifier', function () {
      expect(robin.grid.getRelayIdentifier()).to.equal(relayIdentifier);
    });
    it('should be the expected grid relay identifier', function () {
      expect(robin.api.getRelayIdentifier()).to.equal(relayIdentifier);
    });
  });
});
