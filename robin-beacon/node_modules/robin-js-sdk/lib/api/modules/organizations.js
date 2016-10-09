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
   * Get all the organizations or a particular organization identified by the `orgIdOrSlug` parameter
   * @param  {String|Integer|undefined} orgIdOrSlug A Robin organization id or slug
   * @param  {Object|undefined}         params      A querystring object
   * @return {Function}                             A Promise
   */
  get: function (orgIdOrSlug, params) {
    var path = this.constructPath(constants.ORGANIZATIONS, orgIdOrSlug);
    return this.Core.GET(path, params);
  },

  /**
   * Create an organization
   * @param  {Object}   data A data object
   * @return {Function}      A Promise
   */
  create: function (data) {
    var path;
    if (data) {
      path = this.constructPath(constants.ORGANIZATIONS);
      return this.Core.POST(path, data);
    } else {
      return this.rejectRequest('Bad Request: A data object is required');
    }
  },

  /**
   * Update an organization
   * @param  {String|Integer|undefined} orgIdOrSlug A Robin organization id or slug
   * @param  {Object}                   data        A data object
   * @return {Function}                             A Promise
   */
  update: function (orgIdOrSlug, data) {
    var path;
    if (orgIdOrSlug && data) {
      path = this.constructPath(constants.ORGANIZATIONS, orgIdOrSlug);
      return this.Core.PATCH(path, data);
    } else {
      return this.rejectRequest('Bad Request: An organization id or slug and a data object are required.');
    }
  },

  /**
   * Delete an organization
   * @param  {String|Integer} orgIdOrSlug A Robin organization id or slug
   * @return {Function}                   A Promise
   */
  delete: function (orgIdOrSlug)  {
    var path;
    if (orgIdOrSlug) {
      path = this.constructPath(constants.ORGANIZATIONS, orgIdOrSlug);
      return this.Core.DELETE(path);
    } else {
      return this.rejectRequest('Bad Request: An organization id or slug is required.');
    }
  },

  /**
   * Organization Users
   * @type {Object}
   */
  users: {
    /**
     * Get an organizations users or a particular user identified by `userId`
     * @param  {String|Integer}           orgIdOrSlug A Robin organization id or slug
     * @param  {String|Integer|undefined} userId      A Robin user id
     * @param  {Object|undefined}         params      A querystring object
     * @return {Function}                             A promise
     */
    get: function (orgIdOrSlug, userId, params) {
      var path;
      if (orgIdOrSlug) {
        path = this.constructPath(constants.ORGANIZATIONS, orgIdOrSlug, constants.USERS, userId);
        return this.Core.GET(path);
      } else {
        return this.rejectRequest('Bad Request: An organization id or slug is required.');
      }
    },

    /**
     * Add a user to an organization
     * @param  {String|Integer} orgIdOrSlug A Robin organization id or slug
     * @param  {String|Integer} userId      A Robin user id
     * @return {Function}                   A promise
     */
    add: function (orgIdOrSlug, userId) {
      var path;
      if (orgIdOrSlug && userId) {
        path = this.constructPath(constants.ORGANIZATIONS, orgIdOrSlug, constants.USERS, userId);
        return this.Core.PUT(path);
      } else {
        return this.rejectRequest('Bad Request: An organization id or slug and a user id is required.');
      }
    },

    /**
     * Update a user in an organization
     * @param  {String|Integer} orgIdOrSlug A Robin organization id or slug
     * @param  {String|Integer} userId      A Robin user id
     * @param  {Object}         data      A data object
     * @return {Function}                   A promise
     */
    update: function (orgIdOrSlug, userId, data) {
      var path,
          rejectMsg;
      if (orgIdOrSlug && userId && data) {
        path = this.constructPath(constants.ORGANIZATIONS, orgIdOrSlug, constants.USERS, userId);
        return this.Core.PATCH(path, data);
      } else {
        rejectMsg = 'Bad Request: An organization id or slug and a user id and data is required.';
        return this.rejectRequest(rejectMsg);
      }
    },

    /**
     * Remove a user from an organization
     * @param  {String|Integer} orgIdOrSlug A Robin organization id or slug
     * @param  {String|Integer} userId      A Robin user id
     * @return {Function}                   A promise
     */
    delete: function (orgIdOrSlug, userId) {
      var path;
      if (orgIdOrSlug && userId) {
        path = this.constructPath(constants.ORGANIZATIONS, orgIdOrSlug, constants.USERS, userId);
        return this.Core.DELETE(path);
      } else {
        return this.rejectRequest('Bad Request: An organization id or slug and a user id is required.');
      }
    }
  },

  /**
   * Organization Managers
   * @type {Object}
   */
  managers: {
    /**
     * Get an organizations managers
     * @param  {String|Integer}   orgIdOrSlug A Robin organization id or slug
     * @param  {Object|undefined} params      A querystring object
     * @return {Function}                     A promise
     */
    get: function (orgIdOrSlug, params) {
      var path;
      if (orgIdOrSlug) {
        path = this.constructPath(constants.ORGANIZATIONS, orgIdOrSlug, constants.MANAGERS);
        return this.Core.GET(path);
      } else {
        return this.rejectRequest('Bad Request: An organization id or slug is required.');
      }
    }
  },

  /**
   * Organization Apps
   * @type {Object}
   */
  apps: {
    /**
     * Get an organizations apps
     * @param  {String|Integer}   orgIdOrSlug A Robin organization id or slug
     * @param  {Object|undefined} params      A querystring object
     * @return {Function}                     A promise
     */
    get: function (orgIdOrSlug, params) {
      var path;
      if (orgIdOrSlug) {
        path = this.constructPath(constants.ORGANIZATIONS, orgIdOrSlug, constants.APPS);
        return this.Core.GET(path, params);
      } else {
        return this.rejectRequest('Bad Request: An organization id or slug is required.');
      }
    },

    /**
     * Add an app for an organization
     * @param  {String|Integer} orgIdOrSlug A Robin organization id or slug
     * @param  {Object}         data        A data object
     * @return {Function}                   A Promise
   */
    add: function (orgIdOrSlug, data) {
      var path;
      if (orgIdOrSlug && data) {
        path = this.constructPath(constants.ORGANIZATIONS, orgIdOrSlug, constants.APPS);
        return this.Core.POST(path, data);
      } else {
        return this.rejectRequest('Bad Request: An organization id or slug and a data object is required.');
      }
    }
  },

  /**
   * Organization Devices
   * @type {Object}
   */
  devices: {
    /**
     * Get an organizations devices
     * @param  {String|Integer}   orgIdOrSlug A Robin organization id or slug
     * @param  {Object|undefined} params      A querystring object
     * @return {Function}                     A promise
     */
    get: function (orgIdOrSlug, params) {
      var path;
      if (orgIdOrSlug) {
        path = this.constructPath(constants.ORGANIZATIONS, orgIdOrSlug, constants.DEVICES);
        return this.Core.GET(path, params);
      } else {
        return this.rejectRequest('Bad Request: An organization id or slug is required.');
      }
    },

    /**
     * Add a device for an organization
     * @param  {String|Integer} orgIdOrSlug A Robin organization id or slug
     * @param  {Object}         data        A data object
     * @return {Function}                   A Promise
   */
    add: function (orgIdOrSlug, data) {
      var path;
      if (orgIdOrSlug && data) {
        path = this.constructPath(constants.ORGANIZATIONS, orgIdOrSlug, constants.DEVICES);
        return this.Core.POST(path, data);
      } else {
        return this.rejectRequest('Bad Request: An organization id or slug and a data object is required.');
      }
    }
  },

  /**
   * Organization Projects
   * @type {Object}
   */
  projects: {
    /**
     * Get an organizations projects
     * @param  {String|Integer}   orgIdOrSlug A Robin organization id or slug
     * @param  {Object|undefined} params      A querystring object
     * @return {Function}                     A promise
     */
    get: function (orgIdOrSlug, params) {
      var path;
      if (orgIdOrSlug) {
        path = this.constructPath(constants.ORGANIZATIONS, orgIdOrSlug, constants.PROJECTS);
        return this.Core.GET(path, params);
      } else {
        return this.rejectRequest('Bad Request: An organization id or slug is required.');
      }
    },

    /**
     * Add a project for an organization
     * @param  {String|Integer} orgIdOrSlug A Robin organization id or slug
     * @param  {Object}         data        A data object
     * @return {Function}                   A Promise
   */
    add: function (orgIdOrSlug, data) {
      var path;
      if (orgIdOrSlug && data) {
        path = this.constructPath(constants.ORGANIZATIONS, orgIdOrSlug, constants.PROJECTS);
        return this.Core.POST(path, data);
      } else {
        return this.rejectRequest('Bad Request: An organization id or slug and a data object is required.');
      }
    }
  },

  /**
   * Organization Channels
   * @type {Object}
   */
  channels: {
    /**
     * Get an organizations channels
     * @param  {String|Integer}   orgIdOrSlug A Robin organization id or slug
     * @param  {Object|undefined} params      A querystring object
     * @return {Function}                     A promise
     */
    get: function (orgIdOrSlug, params) {
      var path;
      if (orgIdOrSlug) {
        path = this.constructPath(constants.ORGANIZATIONS, orgIdOrSlug, constants.USERS);
        return this.Core.GET(path, params);
      } else {
        return this.rejectRequest('Bad Request: An organization id or slug is required.');
      }
    },

    /**
     * Add a channel to an organization
     * @param  {String|Integer} orgIdOrSlug       A Robin organization id or slug
     * @param  {String|Integer} channelIdentifier A Robin user id
     * @return {Function}                         A promise
     */
    add: function (orgIdOrSlug, channelIdentifier) {
      var path;
      if (orgIdOrSlug && channelIdentifier) {
        path = this.constructPath(constants.ORGANIZATIONS, orgIdOrSlug, constants.USERS, channelIdentifier);
        return this.Core.PUT(path);
      } else {
        return this.rejectRequest('Bad Request: An organization id or slug and a channel id is required.');
      }
    },

    /**
     * Create a channel in an organization
     * @param  {String|Integer} orgIdOrSlug A Robin organization id or slug
     * @param  {Object}         data        A data object
     * @return {Function}                   A promise
     */
    create: function (orgIdOrSlug, data) {
      var path,
          rejectMsg;
      if (orgIdOrSlug && data) {
        path = this.constructPath(constants.ORGANIZATIONS, orgIdOrSlug, constants.USERS);
        return this.Core.POST(path, data);
      } else {
        rejectMsg = 'Bad Request: An organization id or slug and data is required.';
        return this.rejectRequest(rejectMsg);
      }
    },

    /**
     * Remove a user from an organization
     * @param  {String|Integer} orgIdOrSlug       A Robin organization id or slug
     * @param  {String|Integer} channelIdentifier A Robin user id
     * @return {Function}                         A promise
     */
    delete: function (orgIdOrSlug, channelIdentifier) {
      var path;
      if (orgIdOrSlug && channelIdentifier) {
        path = this.constructPath(constants.ORGANIZATIONS, orgIdOrSlug, constants.USERS, channelIdentifier);
        return this.Core.DELETE(path);
      } else {
        return this.rejectRequest('Bad Request: An organization id or slug and a channel id is required.');
      }
    }
  },

  /**
   * Organization Locations
   * @type {Object}
   */
  locations: {
    /**
     * Get all of an organizations locations
     * @param  {String|Integer}   orgIdOrSlug A Robin organization id or slug
     * @param  {Object|undefined} params      A querystring object
     * @return {Function}                     A promise
     */
    get: function (orgIdOrSlug, params) {
      var path;
      if (orgIdOrSlug) {
        path = this.constructPath(constants.ORGANIZATIONS, orgIdOrSlug, constants.LOCATIONS);
        return this.Core.GET(path, params);
      } else {
        return this.rejectRequest('Bad Request: An organization id or slug is required.');
      }
    },

    /**
     * Add a location to an organization
     * @param  {String|Integer} orgIdOrSlug A Robin organization id or slug
     * @param  {Object}         data        A data object
     * @return {Function}                   A Promise
   */
    add: function (orgIdOrSlug, data) {
      var path;
      if (orgIdOrSlug && data) {
        path = this.constructPath(constants.ORGANIZATIONS, orgIdOrSlug, constants.LOCATIONS);
        return this.Core.POST(path, data);
      } else {
        return this.rejectRequest('Bad Request: An organization id or slug and a data object is required.');
      }
    }
  }
};
