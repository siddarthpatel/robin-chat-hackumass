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
   * Get all the device manifests or a particular device manifest identified by the `identifier` parameter
   * @param  {String|Integer|undefined} identifier A Robin device manifest identifier
   * @param  {Object|undefined}         params     A querystring object
   * @return {Function}                            A Promise
   */
  get: function (identifier, params) {
    var path = this.constructPath(constants.DEVICE_MANIFESTS, identifier);
    return this.Core.GET(path, params);
  },

  /**
   * Create a device manifest
   * @param  {Object}   data A data object
   * @return {Function}      A Promise
   */
  create: function (data) {
    var path;
    if (data) {
      path = this.constructPath(constants.DEVICE_MANIFESTS);
      return this.Core.POST(path, data);
    } else {
      return this.rejectRequest('Bad Request: A data object is required');
    }
  },

  /**
   * Update a device manifest
   * @param  {String|Integer|undefined} identifier A Robin device manifest identifier
   * @param  {Object}                   data       A data object
   * @return {Function}                            A Promise
   */
  update: function (identifier, data) {
    var path;
    if (identifier && data) {
      path = this.constructPath(constants.DEVICE_MANIFESTS, identifier);
      return this.Core.PATCH(path, data);
    } else {
      return this.rejectRequest('Bad Request: A device manifest identifier and a data object are required.');
    }
  },

  /**
   * Delete a device manifest
   * @param  {String|Integer|undefined} identifier A Robin device manifest identifier
   * @return {Function}                            A Promise
   */
  delete: function (identifier)  {
    var path;
    if (identifier) {
      path = this.constructPath(constants.DEVICE_MANIFESTS, identifier);
      return this.Core.DELETE(path);
    } else {
      return this.rejectRequest('Bad Request: A device manifest identifier is required.');
    }
  },

  /**
   * Device Manifest Feeds
   * @type {Object}
   */
  feeds: {
    /**
     * Get all the feeds for a device manifest or a particular feed identified by `feedIdentifier`
     * @param  {String|Integer}           deviceManifestIdentifier A Robin device manifest identifier
     * @param  {String|Integer|undefined} feedIdentifier           A Robin feed identifier
     * @param  {Object|undefined}         params                   A querystring object
     * @return {Function}                                          A Promise
     */
    get: function (deviceManifestIdentifier, feedIdentifier, params) {
      var path;
      if (deviceManifestIdentifier) {
        path = this.constructPath(constants.DEVICE_MANIFESTS, deviceManifestIdentifier,
                                  constants.FEEDS, feedIdentifier);
        return this.Core.GET(path, params);
      } else {
        return this.rejectRequest('Bad Request: A device manifest identifier is required.');
      }
    },

    /**
     * Add a feed to a device manifest
     * @param  {String|Integer} deviceManifestIdentifier A Robin device manifest identifier
     * @param  {Object}         data                     A querystring object
     * @return {Function}                                A Promise
     */
    add: function (deviceManifestIdentifier, data) {
      var path;
      if (deviceManifestIdentifier) {
        path = this.constructPath(constants.DEVICE_MANIFESTS, deviceManifestIdentifier, constants.FEEDS);
        return this.Core.POST(path, data);
      } else {
        return this.rejectRequest('Bad Request: A device manifest identifier and a data object are required.');
      }
    },

    /**
     * Update a feed on a device manifest
     * @param  {String|Integer} deviceManifestIdentifier A Robin device manifest identifier
     * @param  {String|Integer} feedIdentifier           A Robin feed identifier
     * @param  {Object}         data                     A querystring object
     * @return {Function}                                A Promise
     */
    update: function (deviceManifestIdentifier, feedIdentifier, data) {
      var path,
          rejectMsg;
      if (deviceManifestIdentifier && feedIdentifier && data) {
        path = this.constructPath(constants.DEVICE_MANIFESTS, deviceManifestIdentifier,
                                  constants.FEEDS, feedIdentifier);
        return this.Core.PATCH(path, data);
      } else {
        rejectMsg = 'Bad Request: A device manifest identifier, a feed identifier and a data object are required.';
        return this.rejectRequest(rejectMsg);
      }
    },

    /**
     * Delete a feed from a device manifest
     * @param  {String|Integer} deviceManifestIdentifier A Robin device manifest identifier
     * @param  {String|Integer} feedIdentifier           A Robin feed identifier
     * @return {Function}                                A Promise
     */
    delete: function (deviceManifestIdentifier, feedIdentifier) {
      var path;
      if (deviceManifestIdentifier && feedIdentifier) {
        path = this.constructPath(constants.DEVICE_MANIFESTS, deviceManifestIdentifier,
                                  constants.FEEDS, feedIdentifier);
        return this.Core.DELETE(path);
      } else {
        return this.rejectRequest('Bad Request: A device manifest identifier and a feed identifier are required.');
      }
    }
  },

  /**
   * Device Manifest Devices
   * @type {Object}
   */
  devices: {
    /**
     * Get all the devices for a device manifest or a particular device identified by `deviceIdentifier`
     * @param  {String|Integer}           deviceManifestIdentifier A Robin device manifest identifier
     * @param  {String|Integer|undefined} deviceIdentifier         A Robin device identifier
     * @param  {Object|undefined}         params                   A querystring object
     * @return {Function}                                          A Promise
     */
    get: function (deviceManifestIdentifier, deviceIdentifier, params) {
      var path;
      if (deviceManifestIdentifier) {
        path = this.constructPath(constants.DEVICE_MANIFESTS, deviceManifestIdentifier,
                                  constants.DEVICES, deviceIdentifier);
        return this.Core.GET(path, params);
      } else {
        return this.rejectRequest('Bad Request: A device manifest identifier is required.');
      }
    }
  }
};
