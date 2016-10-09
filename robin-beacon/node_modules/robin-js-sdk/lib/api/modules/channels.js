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
   * Get all the channels or a particular channel identified by the `identifier` parameter
   * @param  {String|Integer|undefined} identifier A Robin channel identifier
   * @param  {Object|undefined}         params     A querystring object
   * @return {Function}                            A Promise
   */
  get: function (identifier, params) {
    var path = this.constructPath(constants.CHANNELS, identifier);
    return this.Core.GET(path, params);
  },

  /**
   * Create a channel
   * @param  {Object}   data A data object
   * @return {Function}      A Promise
   */
  create: function (data) {
    var path;
    if (data) {
      path = this.constructPath(constants.CHANNELS);
      return this.Core.POST(path, data);
    } else {
      return this.rejectRequest('Bad Request: A data object is required.');
    }
  },

  /**
   * Update a channel
   * @param  {String|Integer|undefined} identifier A Robin channel identifier
   * @param  {Object}                   data       A data object
   * @return {Function}                            A Promise
   */
  update: function (identifier, data) {
    var path;
    if (identifier && data) {
      path = this.constructPath(constants.CHANNELS, identifier);
      return this.Core.PATCH(path, data);
    } else {
      return this.rejectRequest('Bad Request: A channel identifier and a data object are required.');
    }
  },

  /**
   * Delete a channel
   * @param  {String|Integer} identifier A Robin channel identifier
   * @return {Function}                  A Promise
   */
  delete: function (identifier)  {
    var path;
    if (identifier) {
      path = this.constructPath(constants.CHANNELS, identifier);
      return this.Core.DELETE(path);
    } else {
      return this.rejectRequest('Bad Request: A channel identifier is required.');
    }
  },

  /**
   * Channel Data
   * @type {Object}
   */
  data: {
    /**
     * Get all the data from a channel or a particular channel data point identified by `dataIdentifier`
     * @param  {String|Integer}           channelIdentifier A Robin channel identifier
     * @param  {String|Integer|undefined} dataIdentifier    A Robin channel data point identifier
     * @param  {Object|undefined}         params            A querystring object
     * @return {Function}                                   A Promise
     */
    get: function (channelIdentifier, dataIdentifier, params) {
      var path;
      if (channelIdentifier) {
        path = this.constructPath(constants.CHANNELS, channelIdentifier, constants.DATA, dataIdentifier);
        return this.Core.GET(path, params);
      } else {
        return this.rejectRequest('Bad Request: A channel identifier is required.');
      }
    },

    /**
     * Add data to a channel
     * @param  {String|Integer} channelIdentifier A Robin channel identifier
     * @param  {Object}         data              A querystring object
     * @return {Function}                         A Promise
     */
    add: function (channelIdentifier, data) {
      var path;
      if (channelIdentifier) {
        path = this.constructPath(constants.CHANNELS, channelIdentifier, constants.DATA);
        return this.Core.POST(path, data);
      } else {
        return this.rejectRequest('Bad Request: A channel identifier is required.');
      }
    },

    /**
     * Delete a data point from a channel
     * @param  {String|Integer} channelIdentifier A Robin channel identifier
     * @param  {String|Integer} dataIdentifier    A Robin channel data point identifier
     * @return {Function}                         A Promise
     */
    delete: function (channelIdentifier, dataIdentifier) {
      var path;
      if (channelIdentifier && dataIdentifier) {
        path = this.constructPath(constants.CHANNELS, channelIdentifier, constants.DATA, dataIdentifier);
        return this.Core.DELETE(path);
      } else {
        return this.rejectRequest('Bad Request: A channel identifier and a data point identifier are required.');
      }
    }
  },

  /**
   * Channel Triggers
   * @type {Object}
   */
  triggers: {
    /**
     * Get all the triggers on a channel or a particular channel trigger identified by `triggerIdentifier`
     * @param  {String|Integer}           channelIdentifier A Robin channel identifier
     * @param  {String|Integer|undefined} triggerIdentifier A Robin channel trigger identifier
     * @param  {Object|undefined}         params            A querystring object
     * @return {Function}                                   A Promise
     */
    get: function (channelIdentifier, triggerIdentifier, params) {
      var path;
      if (channelIdentifier) {
        path = this.constructPath(constants.CHANNELS, channelIdentifier, constants.TRIGGERS, triggerIdentifier);
        return this.Core.GET(path, params);
      } else {
        return this.rejectRequest('Bad Request: A channel identifier is required.');
      }
    },

    /**
     * Add a trigger to a channel
     * @param  {String|Integer} channelIdentifier A Robin channel identifier
     * @param  {Object}         data              A querystring object
     * @return {Function}                         A Promise
     */
    add: function (channelIdentifier, data) {
      var path;
      if (channelIdentifier) {
        path = this.constructPath(constants.CHANNELS, channelIdentifier, constants.TRIGGERS);
        return this.Core.POST(path, data);
      } else {
        return this.rejectRequest('Bad Request: A channel identifier and a data object are required.');
      }
    },

    /**
     * Update a trigger on a channel
     * @param  {String|Integer} channelIdentifier A Robin channel identifier
     * @param  {String|Integer} triggerIdentifier A Robin channel trigger identifier
     * @param  {Object}         data              A querystring object
     * @return {Function}                         A Promise
     */
    update: function (channelIdentifier, triggerIdentifier, data) {
      var path,
          rejectMsg;
      if (channelIdentifier && triggerIdentifier && data) {
        path = this.constructPath(constants.CHANNELS, channelIdentifier, constants.TRIGGERS, triggerIdentifier);
        return this.Core.PATCH(path, data);
      } else {
        rejectMsg = 'Bad Request: A channel identifier, a feed identifier and a trigger object are required.';
        return this.rejectRequest(rejectMsg);
      }
    },

    /**
     * Delete a trigger from a channel
     * @param  {String|Integer} channelIdentifier A Robin channel identifier
     * @param  {String|Integer} triggerIdentifier A Robin channel data point identifier
     * @return {Function}                         A Promise
     */
    delete: function (channelIdentifier, triggerIdentifier) {
      var path;
      if (channelIdentifier && triggerIdentifier) {
        path = this.constructPath(constants.CHANNELS, channelIdentifier, constants.TRIGGERS, triggerIdentifier);
        return this.Core.DELETE(path);
      } else {
        return this.rejectRequest('Bad Request: A channel identifier and a trigger identifier are required.');
      }
    }
  }
};
