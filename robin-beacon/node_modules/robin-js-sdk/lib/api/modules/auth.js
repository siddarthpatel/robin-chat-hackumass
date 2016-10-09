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
   * Get access token info
   * @param  {Object}         params         A querystring object
   * @return {Function}                      A Promise
   */
  getAccessTokenInfo: function (params) {
    var path = this.constructPath(constants.AUTH);
    return this.Core.GET(path, params);
  }
};
