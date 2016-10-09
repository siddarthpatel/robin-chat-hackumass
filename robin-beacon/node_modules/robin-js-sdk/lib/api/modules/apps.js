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
   * Get an app
   * @param  {String|Integer|undefined} appIdOrSlug A Robin app identifier or slug
   * @param  {Object|undefnied}         params      A querystring object
   * @return {Function}                             A Promise
   */
  get: function (appIdOrSlug, params) {
    var path = this.constructPath(constants.APPS, appIdOrSlug);
    return this.Core.GET(path, params);
  },

  /**
   * Update an app
   * @param  {String|Integer} appIdOrSlug A Robin app identifier or slug
   * @param  {Object}         data        A data object
   * @return {Function}                   A Promise
   */
  update: function (appIdOrSlug, data) {
    var path;
    if (appIdOrSlug && data) {
      path = this.constructPath(constants.APPS, appIdOrSlug);
      return this.Core.POST(path, data);
    } else {
      return this.rejectRequest('Bad Request: An app id or slug and a data object are required.');
    }
  },

  /**
   * Delete an app
   * @param  {String|Integer} appIdOrSlug A Robin app identifier or slug
   * @return {Function}                   A Promise
   */
  delete: function (appIdOrSlug) {
    var path;
    if (appIdOrSlug) {
      path = this.constructPath(constants.APPS, appIdOrSlug);
      return this.Core.DELETE(path);
    } else {
      return this.rejectRequest('Bad Request: An app id or slug is required.');
    }
  }
};
