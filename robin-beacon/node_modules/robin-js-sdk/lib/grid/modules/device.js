/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var Connection = require('../connection'),
    util = require('util'),
    RbnUtil = require('../../util');

module.exports = (function () {
  function Device (grid) {
    if (grid) {
      RbnUtil.__copyProperties(this, grid);
    } else {
      throw new Error('An instance of the Grid is required');
    }
  }

  util.inherits(Device, Connection);

  Device.prototype.connect = function (identifier) {
    if (identifier) {
      this.endpoint = 'devices';
      this.identifier = identifier;
      return new Connection(this);
    } else {
      throw new TypeError('An the identifier of the entity to which you wish to connect must be supplied');
    }
  };

  return Device;
}).call(this);
