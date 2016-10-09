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
   * Get all the devices or a particular device identified by the `identifier` parameter
   * @param  {String|Integer|undefined} identifier A Robin device identifier
   * @param  {Object|undefined}         params     A querystring object
   * @return {Function}                            A Promise
   */
  get: function (identifier, params) {
    var path = this.constructPath(constants.DEVICES, identifier);
    return this.Core.GET(path, params);
  },

  /**
   * Create a device
   * @param  {Object}   data A data object
   * @return {Function}      A Promise
   */
  create: function (data) {
    var path;
    if (data) {
      path = this.constructPath(constants.DEVICES);
      return this.Core.POST(path, data);
    } else {
      return this.rejectRequest('Bad Request: A data object is required');
    }
  },

  /**
   * Update a device
   * @param  {String|Integer|undefined} identifier A Robin device identifier
   * @param  {Object}                   data       A data object
   * @return {Function}                            A Promise
   */
  update: function (identifier, data) {
    var path;
    if (identifier && data) {
      path = this.constructPath(constants.DEVICES, identifier);
      return this.Core.PATCH(path, data);
    } else {
      return this.rejectRequest('Bad Request: A device identifier and a data object are required.');
    }
  },

  /**
   * Delete a device
   * @param  {String|Integer} identifier A Robin device identifier
   * @return {Function}                  A Promise
   */
  delete: function (identifier)  {
    var path;
    if (identifier) {
      path = this.constructPath(constants.DEVICES, identifier);
      return this.Core.DELETE(path);
    } else {
      return this.rejectRequest('Bad Request: A device identifier is required.');
    }
  },

  /**
   * Device Identifiers
   * @type {Object}
   */
  identifiers: {
    /**
     * Get all the identifiers for a device or a particular identifier identified by `identifierURN`
     * @param  {String|Integer}           deviceIdentifier A Robin device identifier
     * @param  {String|Integer|undefined} identifierURN    A Robin feed identifier
     * @param  {Object|undefined}         params           A querystring object
     * @return {Function}                                  A Promise
     */
    get: function (deviceIdentifier, identifierURN, params) {
      var path;
      if (deviceIdentifier) {
        path = this.constructPath(constants.DEVICES, deviceIdentifier, constants.IDENTIFIERS, identifierURN);
        return this.Core.GET(path, params);
      } else {
        return this.rejectRequest('Bad Request: A device identifier is required.');
      }
    },

    /**
     * Create an identifier for a device
     * @param  {String|Integer} deviceIdentifier A Robin device identifier
     * @param  {Object}         data             A querystring object
     * @return {Function}                        A Promise
     */
    create: function (deviceIdentifier, data) {
      var path;
      if (deviceIdentifier) {
        path = this.constructPath(constants.DEVICES, deviceIdentifier, constants.IDENTIFIERS);
        return this.Core.POST(path, data);
      } else {
        return this.rejectRequest('Bad Request: A device identifier and a data object are required.');
      }
    },

    /**
     * Add an identifier for a device
     * @param  {String|Integer} deviceIdentifier A Robin device identifier
     * @param  {String|Integer} identifierUrn    A Robin identifier URN
     * @param  {Object}         data             A querystring object
     * @return {Function}                        A Promise
     */
    add: function (deviceIdentifier, identifierUrn, data) {
      var path;
      if (deviceIdentifier) {
        path = this.constructPath(constants.DEVICES, deviceIdentifier, constants.IDENTIFIERS, identifierUrn);
        return this.Core.PATCH(path, data);
      } else {
        return this.rejectRequest('Bad Request: A device identifier, an identifier id and a data object are required.');
      }
    },

    /**
     * Delete an identifier from a device
     * @param  {String|Integer} deviceIdentifier A Robin device identifier
     * @param  {String|Integer} identifierUrn    A Robin identifier URN
     * @return {Function}                        A Promise
     */
    delete: function (deviceIdentifier, identifierUrn) {
      var path;
      if (deviceIdentifier && identifierUrn) {
        path = this.constructPath(constants.DEVICES, deviceIdentifier, constants.IDENTIFIERS, identifierUrn);
        return this.Core.DELETE(path);
      } else {
        return this.rejectRequest('Bad Request: A device identifier and an identifier id are required.');
      }
    }
  },

  /**
   * Device Channels
   * @type {Object}
   */
  channels: {
    /**
     * Get all the channels for a device or a particular channel identified by `channelIdentifier`
     * @param  {String|Integer}           deviceIdentifier  A Robin device identifier
     * @param  {String|Integer|undefined} channelIdentifier A Robin channel identifier
     * @param  {Object|undefined}         params            A querystring object
     * @return {Function}                                   A Promise
     */
    get: function (deviceIdentifier, channelIdentifier, params) {
      var path;
      if (deviceIdentifier) {
        path = this.constructPath(constants.DEVICES, deviceIdentifier, constants.CHANNELS, channelIdentifier);
        return this.Core.GET(path, params);
      } else {
        return this.rejectRequest('Bad Request: A device identifier is required.');
      }
    },

    /**
     * Add a channel to a device
     * @param  {String|Integer} deviceIdentifier A Robin device identifier
     * @param  {Object}         data             A querystring object
     * @return {Function}                        A Promise
     */
    create: function (deviceIdentifier, data) {
      var path;
      if (deviceIdentifier) {
        path = this.constructPath(constants.DEVICES, deviceIdentifier, constants.CHANNELS);
        return this.Core.POST(path, data);
      } else {
        return this.rejectRequest('Bad Request: A device identifier and a data object are required.');
      }
    },

    /**
     * Update a feed on a channel
     * @param  {String|Integer} deviceIdentifier  A Robin device identifier
     * @param  {String|Integer} channelIdentifier A Robin channel identifier
     * @param  {Object}         data              A querystring object
     * @return {Function}                         A promise
     */
    update: function (deviceIdentifier, channelIdentifier, data) {
      var path,
          rejectMsg;
      if (deviceIdentifier && channelIdentifier && data) {
        path = this.constructPath(constants.DEVICES, deviceIdentifier, constants.CHANNELS, channelIdentifier);
        return this.Core.PATCH(path, data);
      } else {
        rejectMsg = 'Bad Request: A device identifier, a feed identifier and a data object are required.';
        return this.rejectRequest(rejectMsg);
      }
    },

    /**
     * Delete a channel from a device
     * @param  {String|Integer} deviceIdentifier  A Robin device identifier
     * @param  {String|Integer} channelIdentifier A Robin channel identifier
     * @return {Function}                         A Promise
     */
    delete: function (deviceIdentifier, channelIdentifier) {
      var path;
      if (deviceIdentifier && channelIdentifier) {
        path = this.constructPath(constants.DEVICES, deviceIdentifier, constants.CHANNELS, channelIdentifier);
        return this.Core.DELETE(path);
      } else {
        return this.rejectRequest('Bad Request: A device identifier and a channel identifier are required.');
      }
    }
  },

  /**
   * Device Spaces
   * @type {Object}
   */
  spaces: {
    /**
     * Get a device's spaces
     * @param  {String|Integer}   deviceIdentifier A Robin device identifier
     * @param  {Object|undefined} params           A querystring object
     * @return {Function}                          A promise
     */
    get: function (deviceIdentifier, params) {
      var path;
      if (deviceIdentifier) {
        path = this.constructPath(constants.DEVICES, deviceIdentifier, constants.SPACES);
        return this.Core.GET(path, params);
      } else {
        return this.rejectRequest('Bad Request: A device identifier is required');
      }
    }
  }
};
