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
   * Get an account
   * @param  {String|Integer} accountIdOrSlug A Robin account identifier or slug
   * @param  {Object}         params          A querystring object
   * @return {Function}                       A Promise
   */
  get: function (accountIdOrSlug, params) {
    var path;
    if (accountIdOrSlug) {
      path = this.constructPath(constants.ACCOUNTS, accountIdOrSlug);
      return this.Core.GET(path, params);
    } else {
      return this.rejectRequest('Bad Request: An account id or slug must be supplied for this operation');
    }
  }
};
