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
   * Get all the locations or a particular location identified by `identifier`
   * @param  {String|Integer|undefined} identifier A location identifier
   * @param  {Object}                   params     A querystring object
   * @return {Function}                            A promise
   */
  get: function (identifier, params) {
    var path = this.constructPath(constants.LOCATIONS, identifier);
    return this.Core.GET(path, params);
  },

  /**
   * [update description]
   * @param  {[type]} identifier [description]
   * @param  {[type]} data       [description]
   * @return {[type]}            [description]
   */
  update: function (identifier, data) {
    var path;
    if (identifier && data) {
      path = this.constructPath(constants.LOCATIONS, identifier);
      return this.Core.PATCH(path, data);
    } else {
      return this.rejectRequest('Bad Request. A location identifier and a data object are required');
    }
  },

  /**
   * Delete a location
   * @param  {String|Integer} identifier A Robin location identifier
   * @return {Function}                  A Promise
   */
  delete: function (identifier)  {
    var path;
    if (identifier) {
      path = this.constructPath(constants.LOCATIONS, identifier);
      return this.Core.DELETE(path);
    } else {
      return this.rejectRequest('Bad Request: A location identifier is required.');
    }
  },

  /**
   * Location Spaces
   * @type {Object}
   */
  spaces: {
    /**
     * Get all the spaces in a location or a particular space in a location identified by `spaceIdentifier`
     * @param  {String|Integer}           locationIdentifier A Robin channel identifier
     * @param  {String|Integer|undefined} spaceIdentifier    A Robin channel data point identifier
     * @param  {Object|undefined}         params             A querystring object
     * @return {Function}                                    A Promise
     */
    get: function (locationIdentifier, spaceIdentifier, params) {
      var path;
      if (locationIdentifier) {
        path = this.constructPath(constants.LOCATIONS, locationIdentifier, constants.SPACES, spaceIdentifier);
        return this.Core.GET(path, params);
      } else {
        return this.rejectRequest('Bad Request: A location identifier is required.');
      }
    },

    /**
     * Add space to a location
     * @param  {String|Integer} locationIdentifier A Robin location identifier
     * @param  {Object}         data               A querystring object
     * @return {Function}                          A Promise
     */
    add: function (locationIdentifier, data) {
      var path;
      if (locationIdentifier) {
        path = this.constructPath(constants.LOCATIONS, locationIdentifier, constants.SPACES);
        return this.Core.POST(path, data);
      } else {
        return this.rejectRequest('Bad Request: A location identifier is required.');
      }
    }
  },

  /**
   * Location Presence
   * @type {Object}
   */
  presence: {
    /**
     * Get all the current presence for all the spaces in a location
     * @param  {String|Integer}           locationIdentifier A Robin channel identifier
     * @param  {Object|undefined}         params             A querystring object
     * @return {Function}                                    A Promise
     */
    get: function (locationIdentifier, params) {
      var path;
      if (locationIdentifier) {
        path = this.constructPath(constants.LOCATIONS, locationIdentifier, constants.PRESENCE);
        return this.Core.GET(path, params);
      } else {
        return this.rejectRequest('Bad Request: A location identifier is required.');
      }
    }
  }
};
