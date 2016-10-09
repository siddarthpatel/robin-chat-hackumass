/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var RobinGridBase = require('./base'),
    util = require('util'),
    _gridConnectionModules;

// Initialize these there so that they're available to the RobinGrid when it's constructed
_gridConnectionModules = {
  channel: require('./modules/channel'),
  device: require('./modules/device')
};

/**
 * This is the Robin Grid class
 * It exposes various module endpoints and allows connections to be made to each of these.
 * @return {Function} The Robin Grid object.
 */
module.exports = (function () {
  function RobinGrid (accessToken, baseUrl) {
    RobinGrid.super_.apply(this, arguments);
    this.subscriptions = {};
    this.setAccessToken(accessToken);
    this.setGridUrl(baseUrl);
    this.setupGridMessageHandler();
    this.loadConnectionModules();
  }

  util.inherits(RobinGrid, RobinGridBase);

  /**
   * Instantiates each Robin Grid module class
   */
  RobinGrid.prototype.loadConnectionModules = function () {
    var gridModuleKey,
        GridModule;

    for (gridModuleKey in _gridConnectionModules) {
      GridModule = _gridConnectionModules[gridModuleKey];
      this[gridModuleKey] = new GridModule(this);
    }
  };

  return RobinGrid;
}).call();
