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
   * Get all spaces or a particular space identified by `spaceIdentifier`
   * @param  {String|Integer}   spaceIdentifier A Robin space identifier
   * @param  {Object|undefined} params          A querystring object
   * @return {Function}                         A promise
   */
  get: function (spaceIdentifier, params) {
    var path = this.constructPath(constants.SPACES, spaceIdentifier);
    return this.Core.GET(path, params);
  },

  /**
   * Update a space
   * @param  {String|Integer} spaceIdentifier A Robin space identifier
   * @param  {Object}         data            A data object
   * @return {Function}                       A promise
   */
  update: function (spaceIdentifier, data) {
    var path;
    if (data) {
      path = this.constructPath(constants.SPACES, spaceIdentifier);
      return this.Core.PATCH(path, data);
    } else {
      return this.rejectRequest('Bad Request: Space data is required');
    }
  },

  /**
   * Delete a space
   * @param  {String|Integer} spaceIdentifier A Robin space identifier
   * @return {Function}                       A promise
   */
  delete: function (spaceIdentifier) {
    var path;
    if (spaceIdentifier) {
      path = this.constructPath(constants.SPACES, spaceIdentifier);
      return this.Core.DELETE(path);
    } else {
      return this.rejectRequest('Bad Request: A space identifier is required');
    }
  },

  /**
   * Space Devices
   * @type {Object}
   */
  devices: {
    /**
     * Get all the devices for a space or a particular device identified by `deviceIdentifier`
     * @param  {String|Integer}           spaceIdentifier  A Robin space identifier
     * @param  {String|Integer|undefined} deviceIdentifier A Robin device identifier
     * @param  {Object|undefined}         params           A querystring object
     * @return {Function}                                  A Promise
     */
    get: function (spaceIdentifier, deviceIdentifier, params) {
      var path;
      if (spaceIdentifier) {
        path = this.constructPath(constants.SPACES, spaceIdentifier, constants.DEVICES, deviceIdentifier);
        return this.Core.GET(path, params);
      } else {
        return this.rejectRequest('Bad Request: A space identifier is required.');
      }
    },

    /**
     * Create a device in a space
     * @param  {String|Integer} spaceIdentifier A Robin space identifier
     * @param  {Object}         data            A data object
     * @return {Function}                       A Promise
     */
    create: function (spaceIdentifier, data) {
      var path;
      if (spaceIdentifier && data) {
        path = this.constructPath(constants.SPACES, spaceIdentifier, constants.DEVICES);
        return this.Core.POST(path, data);
      } else {
        return this.rejectRequest('Bad Request: A space identifier and device data are required');
      }
    },

    /**
     * Add a device to a space
     * @param  {String|Integer} spaceIdentifier  A Robin space identifier
     * @param  {String|Integer} deviceIdentifier A Robin device identifier
     * @return {Function}                        A Promise
     */
    add: function (spaceIdentifier, deviceIdentifier) {
      var path;
      if (spaceIdentifier && deviceIdentifier) {
        path = this.constructPath(constants.SPACES, spaceIdentifier, constants.DEVICES, deviceIdentifier);
        return this.Core.PUT(path);
      } else {
        return this.rejectRequest('Bad Request: A space identifier and device identifier are required');
      }
    },

    /**
     * Delete a device from a space
     * @param  {String|Integer} spaceIdentifier  A Robin space identifier
     * @param  {String|Integer} deviceIdentifier A Robin device identifier
     * @return {Function}                        A Promise
     */
    delete: function (spaceIdentifier, deviceIdentifier) {
      var path;
      if (spaceIdentifier && deviceIdentifier) {
        path = this.constructPath(constants.SPACES, spaceIdentifier, constants.DEVICES, deviceIdentifier);
        return this.Core.DELETE(path);
      } else {
        return this.rejectRequest('Bad Request: A space identifier and device identifier are required');
      }
    }
  },

  /**
   * Space presence
   * @type {Object}
   */
  presence: {
    /**
     * Get all the presence for a space
     * @param  {String|Integer}   spaceIdentifier A Robin space identifier
     * @param  {Object|undefined} params          A querystring object
     * @return {Function}                         A Promise
     */
    get: function (spaceIdentifier, params) {
      var path;
      if (spaceIdentifier) {
        path = this.constructPath(constants.SPACES, spaceIdentifier, constants.PRESENCE);
        return this.Core.GET(path, params);
      } else {
        return this.rejectRequest('Bad Request: A space identifier is required.');
      }
    },

    /**
     * Add presence to a space
     * @param  {String|Integer} spaceIdentifier  A Robin space identifier
     * @param  {Object}         data             A data payload
     * @return {Function}                        A Promise
     */
    add: function (spaceIdentifier, data) {
      var path;
      if (spaceIdentifier && data) {
        path = this.constructPath(constants.SPACES, spaceIdentifier, constants.PRESENCE);
        return this.Core.POST(path, data);
      } else {
        return this.rejectRequest('Bad Request: A space identifier and data object are required');
      }
    },

    /**
     * Delete a device from a space
     * @param  {String|Integer} spaceIdentifier  A Robin space identifier
     * @param  {Object}         data             A data payload
     * @return {Function}                        A Promise
     */
    delete: function (spaceIdentifier, data) {
      var path;
      if (spaceIdentifier && data) {
        path = this.constructPath(constants.SPACES, spaceIdentifier, constants.PRESENCE);
        return this.Core.DELETE(path, data);
      } else {
        return this.rejectRequest('Bad Request: A space identifier and data object are required');
      }
    }
  }
};
