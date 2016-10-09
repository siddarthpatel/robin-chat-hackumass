/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var error = require('../lib/error'),
    chai = require('chai'),
    expect = chai.expect;

describe('error', function () {
  it('is a string', function () {
    var err, foo;
    foo = 'foo';
    err = new error.ApiError('foo');
    expect(err.message).to.equal(foo);
  });
  it('is a shallow error object', function () {
    var err, foo;
    foo = {
      body: {
        foo: 'bar'
      }
    };
    err = new error.ApiError(foo);
    expect(err.message).to.equal(foo.toString());
  });
  it('is a sufficiently deep object but is invalid', function () {
    var err, foo;
    foo = {
      body: {
        meta: {
          foo: 'bar'
        }
      }
    };
    err = new error.ApiError(foo);
    expect(err.message).to.not.equal(foo.toString());
  });
});
