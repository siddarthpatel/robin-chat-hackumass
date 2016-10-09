/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 * When this module is required in JavaScript source, it will allow a
 * child class to extend a parent class, by invoking the function exported
 * by this module.
 */

var util = require('util'),
    rbnUtil = require('./util');

function ApiError (err) {
  ApiError.super_.call(this);
  if (!rbnUtil.isObject(err)) {
    this.message = err.toString();
  } else {
    if (!rbnUtil.isObject(err.body)) {
      this.message = err.toString();
    } else {
      if (!rbnUtil.isObject(err.body.meta)) {
        this.message = err.toString();
      } else {
        this['status_code'] = err.body.meta['status_code'];
        this.status = err.body.meta.status;
        this.message = err.body.meta.message;
        this.moreInfo = err.body.meta['more_info'];
      }
    }
  }
}
util.inherits(ApiError, Error);

module.exports.ApiError = ApiError;
