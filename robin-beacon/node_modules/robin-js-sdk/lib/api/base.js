/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var Promise = require('bluebird');

module.exports = (function () {
  /**
   * The Robin API Base class constructor
   */
  function RobinApiBase () {
  }

  /**
   * Set the Robin Access Token
   * @param {String} token A Robin Access Token
   */
  RobinApiBase.prototype.setAccessToken = function (token) {
    if (token) {
      this._accessToken = token;
    }
  };

  /**
   * Get the Robin Access Token
   * @return {String} A Robin Access Token
   */
  RobinApiBase.prototype.getAccessToken = function () {
    if (this._accessToken) {
      return this._accessToken;
    }
  };

  /**
   * Set the Robin Relay Identifier
   * @return {String} relayIdentifier A Robin Relay Identifier
   */
  RobinApiBase.prototype.setRelayIdentifier = function (relayIdentifier) {
    if (relayIdentifier) {
      this._relayIdentifier = relayIdentifier;
    }
  };

  /**
   * Get the Robin Relay Identifier
   * @return {String} A Robin Relay Identifier
   */
  RobinApiBase.prototype.getRelayIdentifier = function () {
    if (this._relayIdentifier) {
      return this._relayIdentifier;
    }
  };

  /**
   * Reject an invalid API request
   * @param  {*}         rejection Any type of variable that can be used to reject this promise
   * @return {Function}            A promise that get's rejected.
   */
  RobinApiBase.prototype.rejectRequest = function (rejection) {
    return Promise.reject(rejection);
  };

  /**
   * A utility function to construct a url path
   * It iterates through the arguments and joins them all into a
   * string separated by a '/' character
   * @return {String} A url path
   */
  RobinApiBase.prototype.constructPath = function () {
    var path,
        arg,
        argument,
        args = [];

    for (arg in arguments) {
      argument = arguments[arg];
      if (argument) {
        args.push(argument);
      }
    }
    path = args.join('/');
    if (path) {
      if (path.slice(0, 1) !== '/') {
        path = '/' + path;
      }
    } else {
      path = '/';
    }
    return path;
  };

  return RobinApiBase;
}).apply(this, arguments);
