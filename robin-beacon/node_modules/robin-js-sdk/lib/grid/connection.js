/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

module.exports = (function () {
  var util = require('util'),
      RbnUtil = require('../util'),
      EventEmitter = require('events').EventEmitter;

  /**
   * This connection class is instantiated as an object when you call the `connect`
   * method on a grid module. It sets up the connection to a specific point entity
   * on the grid and emits messages as they come in. You can also sent messages of a specific type
   * to this connection.
   * @param {Object} gridModule A previously instantiated `grid` module.
   */
  function Connection (gridModule) {
    try {
      Connection.super_.apply(this, arguments);
      RbnUtil.__copyProperties(this, gridModule);
      this.validate();
      this.connectionStub = '/' + this.endpoint + '/' + this.identifier;
    } catch (err) {
      throw err;
    }
  }

  util.inherits(Connection, EventEmitter);

  /**
   * Validates the endpoint and identifier we're using
   */
  Connection.prototype.validate = function () {
    if (!this.endpoint) {
      throw new Error('The supplied endpoint is invalid or malformed.');
    }
    if (!this.identifier) {
      throw new Error('The supplied identifier is invalid or malformed.');
    }
  };

  /**
   * Creates the connection with the grid and listens for messages. Emits each message
   * based on the `type` of that message.
   * @param  {Function|undefined} callback    An optional callback to execute. After the message is sent.
   *                                          `callback` should expect arguments of the form (error, response).
   */
  Connection.prototype.listen = function (callback) {
    //Asterisk listens to all message types, so we can emit for different message types
    var listeningChannel = this.connectionStub + '/*';
    this.connection = this.gridClient.subscribe(listeningChannel, this.messageCallback.bind(this));
    this.connection.then(function (resp) {
      if (callback) {
        callback(null, resp);
      }
    }, function (err) {
      if (callback) {
        callback(err);
      }
    });
  };

  /**
   * Function to call every time a message is received on this connection
   * @param  {Object} message A message received from this connection on the Grid.
   */
  Connection.prototype.messageCallback = function (message) {
    this.emit(message.ext.type, message.data);
  };

  /**
   * Stops emitting messages from this connection
   * @param  {Function} callback [description]
   */
  Connection.prototype.stop = function (callback) {
    if (this.connection) {
      this.connection.cancel();
      if (callback) {
        callback(null);
      }
    } else {
      if (callback) {
        callback('No connection found');
      }
    }
  };

  /**
   * Send a message along the grid
   * @param  {String}             messageType The type of message to send.
   *                                          This will be used when `emitting` to listeners.
   * @param  {Object}             message     The message payload to send along the grid
   * @param  {Function|undefined} callback    An optional callback to execute. After the message is sent.
   *                                          `callback` should expect arguments of the form (error, response).
   */
  Connection.prototype.send = function (messageType, message, callback) {
    var published,
        sendingChannel = this.connectionStub + '/' + messageType;
    published = this.gridClient.publish(sendingChannel, message);
    published.then(function (resp) {
      if (callback) {
        callback(null, resp);
      }
    }, function (err) {
      if (callback) {
        callback(err);
      }
    });
  };

  return Connection;
}).call(this);
