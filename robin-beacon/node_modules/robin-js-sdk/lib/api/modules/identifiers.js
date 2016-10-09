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
   * Get all the identifiers or a particular identifier identified by the `identifierUrn` parameter
   * @param  {String|Integer|undefined} identifierUrn A Robin identifier URN
   * @param  {Object|undefined}         params        A querystring object
   * @return {Function}                               A Promise
   */
  get: function (identifierUrn, params) {
    var path = this.constructPath(constants.IDENTIFIERS, identifierUrn);
    return this.Core.GET(path, params);
  },

  /**
   * Delete an identifier
   * @param  {String|Integer} identifierUrn A Robin identifier URN
   * @return {Function}                     A Promise
   */
  delete: function (identifierUrn) {
    if (identifierUrn) {
      var path = this.constructPath(constants.IDENTIFIERS, identifierUrn);
      return this.Core.DELETE(path);
    } else {
      return this.rejectRequest('Bad request: An identifier URN is required.');
    }
  }
};
