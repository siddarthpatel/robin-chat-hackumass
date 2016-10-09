/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var Connection = require('../../lib/grid/connection'),
    chai = require('chai'),
    expect = chai.expect,
    Grid = require('../../lib/grid'),
    grid,
    Promise = require('bluebird'),
    sinon = require('sinon');

before(function () {
  var accessToken = 'foo',
      gridUrl = 'http://grid.localhost/v1.0';
  grid = new Grid(accessToken, gridUrl);
});

describe('grid - connection', function () {
  describe('instantiate', function () {
    it('should throw an error', function () {
      var connection;
      expect(function () {
        connection = new Connection();
      }).to.throw(Error);
    });
    describe('empty grid module argument', function () {
      var gridModuleMock;
      before(function () {
        gridModuleMock = {};
      });
      it('should throw an error with empty module', function () {
        var connection;
        expect(function () {
          connection = new Connection(gridModuleMock);
        }).to.throw(Error);
      });
    });
    describe('invalid grid module argument', function () {
      var gridModuleMock;
      before(function () {
        gridModuleMock = {
          endpoint: '/devices'
        };
      });
      it('should throw an error with an invalid module', function () {
        var connection;
        expect(function () {
          connection = new Connection(gridModuleMock);
        }).to.throw(Error);
      });
    });
    describe('valid grid module argument', function () {
      var gridModuleMock;
      before(function () {
        gridModuleMock = {
          endpoint: '/devices',
          identifier: 15
        };
      });
      it('should instantiate correctly', function () {
        var connection = new Connection(gridModuleMock);
        expect(connection).to.be.instanceof(Connection);
      });
    });
    describe('listen to connection', function () {
      describe('error', function () {
        var connection,
            resolvedStub;
        it('should receive an error', function (done) {
          connection = grid.device.connect(15);
          resolvedStub = sinon.stub(connection.gridClient, 'subscribe').returns(Promise.reject('error'));
          connection.gridClient.subscribe = resolvedStub;
          connection.listen(function (err, resp) {
            expect(err).to.not.be.null;
            done();
          });
        });
        after(function () {
          connection.gridClient.subscribe.restore();
        });
      });
      describe('resolved', function () {
        var connection,
            resolvedStub;
        before(function () {
          connection = grid.device.connect(15);
          resolvedStub = sinon.stub(connection.gridClient, 'subscribe').returns(Promise.resolve('Resolved message'));
          connection.gridClient.subscribe = resolvedStub;
        });
        it('should set up a listener', function (done) {
          connection.listen(function (err, resp) {
            expect(resp).to.not.be.null;
            done();
          });
        });
        after(function () {
          connection.gridClient.subscribe.restore();
        });
      });
      describe('emit message', function () {
        var connection,
            message;
        before(function () {
          connection = grid.device.connect(15);
          message = {
            ext: {
              type: 'data'
            },
            data: {
              foo: 'bar'
            }
          };
        });
        it('should set up a listener', function (done) {
          connection.on(message.ext.type, function (data) {
            expect(data).to.have.property('foo');
            done();
          });
          connection.messageCallback(message);
        });
      });
      describe('stop listening', function () {
        var resolvedStub;
        describe('error', function () {
          var connection;
          before(function () {
            connection = grid.device.connect(15);
            resolvedStub = sinon.stub(connection.gridClient, 'subscribe').returns(Promise.resolve('Resolved Message'));
            connection.gridClient.subscribe = resolvedStub;
          });
          it('should pass an error message', function (done) {
            connection.stop(function (err) {
              expect(err).to.not.be.null;
              done();
            });
          });
          after(function () {
            connection.gridClient.subscribe.restore();
          });
        });
        describe('stop gracefully', function () {
          var connection;
          before(function () {
            connection = grid.device.connect(15);
            resolvedStub = sinon.stub(connection.gridClient, 'subscribe').returns(Promise.resolve('Resolved Message'));
            connection.gridClient.subscribe = resolvedStub;
            connection.listen();
          });
          it('should stop listening without a message', function (done) {
            connection.stop(function (err) {
              expect(err).to.be.null;
              done();
            });
          });
          after(function () {
            connection.gridClient.subscribe.restore();
          });
        });
      });
    });
    describe('send messages to connection', function () {
      describe('send error', function () {
        var connection,
            resolvedStub,
            message = {};
        message.foo = 'bar';
        it('should callback with an error', function (done) {
          connection = grid.device.connect(15);
          resolvedStub = sinon.stub(connection.gridClient, 'publish').returns(Promise.reject('Can\'t send this message now'));
          connection.gridClient.publish = resolvedStub;
          connection.send('data', message, function (err, resp) {
            expect(err).to.not.be.null;
            done();
          });
        });
        after(function () {
          connection.gridClient.publish.restore();
        });
      });
      describe('send success', function () {
        var connection,
            resolvedStub,
            message = {};
        message.foo = 'bar';
        before(function () {
          connection = grid.device.connect(15);
          resolvedStub = sinon.stub(connection.gridClient, 'publish').returns(Promise.resolve('Message Sent Successfully'));
          connection.gridClient.publish = resolvedStub;
        });
        it('should callback with an error', function (done) {
          connection.send('data', message, function (err, resp) {
            expect(err).to.be.null;
            done();
          });
        });
        after(function () {
          connection.gridClient.publish.restore();
        });
      });
    });
  });
});
