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
   * Get /me, which is an alias for /users/:id, where :id is the id of the current user
   * @param  {Object}   params A querystring object
   * @return {Function}        A promise
   */
  get: function (params) {
    var path = this.constructPath(constants.ME);
    return this.Core.GET(path);
  },

  /**
   * Update the current user
   * @param  {Object}   data A data object
   * @return {Function}      A promise
   */
  update: function (data) {
    if (data) {
      var path = this.constructPath(constants.ME);
      return this.Core.PATCH(path, data);
    } else {
      return this.rejectRequest('Bad Request. A data object is required');
    }
  },

  /**
   * Update the current user's email
   * @param  {Object}   data A data object
   * @return {Function}      A promise
   */
  updateEmail: function (data) {
    if (data) {
      var path = this.constructPath(constants.ME, constants.EMAIL);
      return this.Core.PATCH(path, data);
    } else {
      return this.rejectRequest('Bad Request. A data object is required');
    }
  },

  /**
   * Update the current user's password
   * @param  {Object}   data A data object
   * @return {Function}      A promise
   */
  changePassword: function (data) {
    if (data) {
      var path = this.constructPath(constants.ME, constants.PASSWORD);
      return this.Core.PATCH(path, data);
    } else {
      return this.rejectRequest('Bad Request. A data object is required');
    }
  },

  /**
   * Delete the current user
   * @return {Function} A Promise
   */
  delete: function ()  {
    var path = this.constructPath(constants.ME);
    return this.Core.DELETE(path);
  },

  /**
   * User's organizations
   * @type {Object}
   */
  organizations: {
    /**
     * Get a user's organizations
     * @param  {Object}   params A querystring object
     * @return {Function}        A promise
     */
    get: function (params) {
      var path = this.constructPath(constants.ME, constants.ORGANIZATIONS);
      return this.Core.GET(path);
    }
  },

  /**
   * User's app/account authorizations
   * @type {Object}
   */
  authorizations: {
    /**
     * Get a user's authorizations
     * @param  {Object}   params A querystring object
     * @return {Function}        A promise
     */
    get: function (params) {
      var path = this.constructPath(constants.ME, constants.AUTHORIZATIONS);
      return this.Core.GET(path);
    },

    /**
     * Add an authorization for the current user
     * @param  {String}   type       Authorization Type
     * @param  {String}   identifier Authorization Identifier
     * @param  {Object}   data       A data object
     * @return {Function}            A promise
     */
    add: function (type, identifier, data) {
      var path;
      if (type && identifier && data) {
        path = this.constructPath(constants.ME, constants.AUTHORIZATIONS, type, identifier);
        return this.Core.POST(path, data);
      } else {
        return this.rejectRequest('Bad Request: Authorization type and identifier and data payload are required');
      }
    },

    /**
     * Create an authorization for the current user
     * @param  {String}   type       Authorization Type
     * @param  {String}   identifier Authorization Identifier
     * @return {Function}            A promise
     */
    delete: function (type, identifier) {
      var path;
      if (type && identifier) {
        path = this.constructPath(constants.ME, constants.AUTHORIZATIONS, type, identifier);
        return this.Core.DELETE(path);
      } else {
        return this.rejectRequest('Bad Request: Authorization type and identifier are both required');
      }
    }
  },

  /**
   * User's devices
   * @type {Object}
   */
  devices: {
    /**
     * Get a user's devices
     * @param  {Object}   params A querystring object
     * @return {Function}        A promise
     */
    get: function (params) {
      var path = this.constructPath(constants.ME, constants.DEVICES);
      return this.Core.GET(path);
    },

    /**
     * Add a device for the current user
     * @param  {Object}   data A data object
     * @return {Function}      A promise
     */
    add: function (data) {
      var path;
      if (data) {
        path = this.constructPath(constants.ME, constants.DEVICES);
        return this.Core.POST(path, data);
      } else {
        return this.rejectRequest('Bad Request: A data object is required');
      }
    }
  },

  /**
   * User's projects
   * @type {Object}
   */
  projects: {
    /**
     * Get a user's projects
     * @param  {Object}   params A querystring object
     * @return {Function}        A promise
     */
    get: function (params) {
      var path = this.constructPath(constants.ME, constants.PROJECTS);
      return this.Core.GET(path);
    },

    /**
     * Add a device for the current user
     * @param  {Object}   data A data object
     * @return {Function}      A promise
     */
    add: function (data) {
      var path;
      if (data) {
        path = this.constructPath(constants.ME, constants.PROJECTS);
        return this.Core.POST(path, data);
      } else {
        return this.rejectRequest('Bad Request: A data object is required');
      }
    }
  },

  /**
   * User's channels
   * @type {Object}
   */
  channels: {
    /**
     * Get a user's channels
     * @param  {Object}   params A querystring object
     * @return {Function}        A promise
     */
    get: function (params) {
      var path = this.constructPath(constants.ME, constants.CHANNELS);
      return this.Core.GET(path);
    },

    /**
     * Create a channel for the current user
     * @param  {Object}   data A data object
     * @return {Function}      A promise
     */
    create: function (data) {
      var path;
      if (data) {
        path = this.constructPath(constants.ME, constants.CHANNELS);
        return this.Core.POST(path, data);
      } else {
        return this.rejectRequest('Bad Request: A data object is required');
      }
    },

    /**
     * Add a channel for the current user
     * @param  {String|Integer} channelIdentifier A robin channel identifier
     * @return {Function}                         A promise
     */
    add: function (channelIdentifier) {
      var path;
      if (channelIdentifier) {
        path = this.constructPath(constants.ME, constants.CHANNELS, channelIdentifier);
        return this.Core.PUT(path);
      } else {
        return this.rejectRequest('Bad Request: A channel identifier is required');
      }
    },

    /**
     * Delete a channel for the current user
     * @param  {String|Integer} channelIdentifier A robin channel identifier
     * @return {Function}                         A promise
     */
    delete: function (channelIdentifier) {
      var path;
      if (channelIdentifier) {
        path = this.constructPath(constants.ME, constants.CHANNELS, channelIdentifier);
        return this.Core.DELETE(path);
      } else {
        return this.rejectRequest('Bad Request: A channel identifier is required');
      }
    }
  },

  /**
   * User's identifiers
   * @type {Object}
   */
  identifiers: {
    /**
     * Get a user's identifiers
     * @param  {Object}   params A querystring object
     * @return {Function}        A promise
     */
    get: function (params) {
      var path = this.constructPath(constants.ME, constants.IDENTIFIERS);
      return this.Core.GET(path);
    },

    /**
     * Create an identifier for the current user
     * @param  {Object}   data A data object
     * @return {Function}      A promise
     */
    create: function (data) {
      var path;
      if (data) {
        path = this.constructPath(constants.ME, constants.IDENTIFIERS);
        return this.Core.POST(path, data);
      } else {
        return this.rejectRequest('Bad Request: A data object is required');
      }
    },

    /**
     * Add an identifier for the current user
     * @param  {String|Integer} identifierUrn A robin identifier urn
     * @return {Function}                     A promise
     */
    add: function (identifierUrn) {
      var path;
      if (identifierUrn) {
        path = this.constructPath(constants.ME, constants.IDENTIFIERS, identifierUrn);
        return this.Core.PUT(path);
      } else {
        return this.rejectRequest('Bad Request: An identifier urn is required');
      }
    },

    /**
     * Delete an identifier for the current user
     * @param  {String|Integer} identifierUrn A robin identifier urn
     * @return {Function}                     A promise
     */
    delete: function (identifierUrn) {
      var path;
      if (identifierUrn) {
        path = this.constructPath(constants.ME, constants.IDENTIFIERS, identifierUrn);
        return this.Core.DELETE(path);
      } else {
        return this.rejectRequest('Bad Request: An identifier urn is required');
      }
    }
  }
};
