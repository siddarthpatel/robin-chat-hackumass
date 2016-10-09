/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var constants = require('../../util').constants;

module.exports = {
  /**
   * Create an event
   * @param  {Object}   data A data object
   * @return {Function}      A promise
   */
  create: function (data) {
    var path;
    if (data) {
      path = this.constructPath(constants.EVENTS);
      return this.Places.POST(path, data);
    } else {
      return this.rejectRequest('Bad Request: A data object is required.');
    }
  }
};
