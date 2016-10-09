/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */

var rbnUtil = require('../lib/util.js'),
    chai = require('chai'),
    expect = chai.expect,
    mocks;

// Constants
var validApiTestUrl = 'http://api.test.robinpowered.com/v1.0',
    validApiStagingUrl = 'https://api.staging.robinpowered.com/v1.0',
    validApiProductionUrl = 'https://api.robinpowered.com/v1.0',
    validAppsTestUrl = 'http://apps.test.robinpowered.com/v1.0',
    validAppsStagingUrl = 'https://apps.staging.robinpowered.com/v1.0',
    validAppsProductionUrl = 'https://apps.robinpowered.com/v1.0',
    validGridTestUrl = 'http://grid.test.robinpowered.com/v1.0',
    validGridStagingUrl = 'https://grid.staging.robinpowered.com/v1.0',
    validGridProductionUrl = 'https://grid.robinpowered.com/v1.0';

mocks = {
  urls: {
    production: {
      core: validApiProductionUrl,
      grid: validGridProductionUrl,
      places: validAppsProductionUrl
    },
    staging: {
      core: validApiStagingUrl,
      grid: validGridStagingUrl,
      places: validAppsStagingUrl
    },
    test: {
      core: validApiTestUrl,
      grid: validGridTestUrl,
      places: validAppsTestUrl
    }
  }
};

describe('robin util', function () {
  describe('construct robin url', function () {
    describe('nonsense', function () {
      it('should throw an error when creating a test url', function () {
        var testUrl;
        expect(function () {
          testUrl = rbnUtil.constructRobinUrl('nonsense', 'test');
        }).to.throw(TypeError);
      });
      it('should throw an error when creating a staging url', function () {
        var stagingUrl;
        expect(function () {
          stagingUrl = rbnUtil.constructRobinUrl('nonsense', 'staging');
        }).to.throw(TypeError);
      });
      it('should throw an error when creating a production url', function () {
        var productionUrl;
        expect(function () {
          productionUrl = rbnUtil.constructRobinUrl('nonsense', 'production');
        }).to.throw(TypeError);
      });
      it('should throw an error when creating a production url', function () {
        var productionUrl;
        expect(function () {
          productionUrl = rbnUtil.constructRobinUrl('nonsense');
        }).to.throw(TypeError);
      });
      it('should throw an error when creating a nonsense url', function () {
        var fooUrl;
        expect(function () {
          fooUrl = rbnUtil.constructRobinUrl('nonsense', 'foo');
        }).to.throw(TypeError);
      });
    });
    describe('api', function () {
      describe('test env argument', function () {
        it('should construct a valid api test url', function () {
          var testUrl = rbnUtil.constructRobinUrl('api', 'test');
          expect(testUrl).to.equal(validApiTestUrl);
        });
      });
      describe('staging env argument', function () {
        it('should construct a valid api staging url', function () {
          var stagingUrl = rbnUtil.constructRobinUrl('api', 'staging');
          expect(stagingUrl).to.equal(validApiStagingUrl);
        });
      });
      describe('production env argument', function () {
        it('should construct a valid api production url', function () {
          var productionUrl = rbnUtil.constructRobinUrl('api', 'production');
          expect(productionUrl).to.equal(validApiProductionUrl);
        });
      });
      describe('no env argument', function () {
        it('should construct a valid api production url', function () {
          var productionUrl = rbnUtil.constructRobinUrl('api');
          expect(productionUrl).to.equal(validApiProductionUrl);
        });
      });
      describe('nonsense env argument', function () {
        it('should throw an error', function () {
          expect(function () {
            rbnUtil.constructRobinUrl('api', 'foo');
          }).to.throw(TypeError);
        });
      });
    });
    describe('apps', function () {
      describe('test env argument', function () {
        it('should construct a valid apps test url', function () {
          var testUrl = rbnUtil.constructRobinUrl('apps', 'test');
          expect(testUrl).to.equal(validAppsTestUrl);
        });
      });
      describe('staging env argument', function () {
        it('should construct a valid apps staging url', function () {
          var stagingUrl = rbnUtil.constructRobinUrl('apps', 'staging');
          expect(stagingUrl).to.equal(validAppsStagingUrl);
        });
      });
      describe('production env argument', function () {
        it('should construct a valid apps production url', function () {
          var productionUrl = rbnUtil.constructRobinUrl('apps', 'production');
          expect(productionUrl).to.equal(validAppsProductionUrl);
        });
      });
      describe('no env argument', function () {
        it('should construct a valid apps production url', function () {
          var productionUrl = rbnUtil.constructRobinUrl('apps');
          expect(productionUrl).to.equal(validAppsProductionUrl);
        });
      });
      describe('nonsense env argument', function () {
        it('should throw an error', function () {
          expect(function () {
            rbnUtil.constructRobinUrl('api', 'foo');
          }).to.throw(TypeError);
        });
      });
    });
    describe('grid', function () {
      describe('test env argument', function () {
        it('should construct a valid grid test url', function () {
          var testUrl = rbnUtil.constructRobinUrl('grid', 'test');
          expect(testUrl).to.equal(validGridTestUrl);
        });
      });
      describe('staging env argument', function () {
        it('should construct a valid grid staging url', function () {
          var stagingUrl = rbnUtil.constructRobinUrl('grid', 'staging');
          expect(stagingUrl).to.equal(validGridStagingUrl);
        });
      });
      describe('production env argument', function () {
        it('should construct a valid grid production url', function () {
          var productionUrl = rbnUtil.constructRobinUrl('grid', 'production');
          expect(productionUrl).to.equal(validGridProductionUrl);
        });
      });
      describe('no env argument', function () {
        it('should construct a valid grid production url', function () {
          var productionUrl = rbnUtil.constructRobinUrl('grid');
          expect(productionUrl).to.equal(validGridProductionUrl);
        });
      });
      describe('nonsense env argument', function () {
        it('should throw an error', function () {
          expect(function () {
            rbnUtil.constructRobinUrl('api', 'foo');
          }).to.throw(TypeError);
        });
      });
    });
  });
  describe('build robin urls', function () {
    describe('undefined arg', function () {
      it('should build a valid production url object', function () {
        var robinUrls = rbnUtil.buildRobinUrls();
        expect(robinUrls).to.deep.equal(mocks.urls.production);
      });
    });
    describe('null arg', function () {
      it('should build a valid production url object', function () {
        var robinUrls = rbnUtil.buildRobinUrls(null);
        expect(robinUrls).to.deep.equal(mocks.urls.production);
      });
    });
    describe('env string args', function () {
      describe('empty string', function () {
        it('should build a valid production url object', function () {
          var robinUrls = rbnUtil.buildRobinUrls('');
          expect(robinUrls).to.deep.equal(mocks.urls.production);
        });
      });
      describe('production env', function () {
        it('should build a valid production url object', function () {
          var robinUrls = rbnUtil.buildRobinUrls('production');
          expect(robinUrls).to.deep.equal(mocks.urls.production);
        });
      });
      describe('staging env', function () {
        it('should build a valid staging url object', function () {
          var robinUrls = rbnUtil.buildRobinUrls('staging');
          expect(robinUrls).to.deep.equal(mocks.urls.staging);
        });
      });
      describe('test env', function () {
        it('should build a valid test url object', function () {
          var robinUrls = rbnUtil.buildRobinUrls('test');
          expect(robinUrls).to.deep.equal(mocks.urls.test);
        });
      });
      describe('invalid env', function () {
        it('should throw an error', function () {
          expect(function () {
            rbnUtil.buildRobinUrls('invalid');
          }).to.throw(TypeError);
        });
      });
    });
    describe('env object args', function () {
      describe('invalid env property', function () {
        describe('object', function () {
          it('should throw an error', function () {
            expect(function () {
              rbnUtil.buildRobinUrls({
                env: {
                  foo: 'bar'
                }
              });
            }).to.throw(TypeError);
          });
        });
        describe('array', function () {
          it('should throw an error', function () {
            expect(function () {
              rbnUtil.buildRobinUrls({
                env: [1,2,3]
              });
            }).to.throw(TypeError);
          });
        });
      });
      describe('empty object arg', function () {
        it('should build a valid production url object', function () {
          var robinUrls = rbnUtil.buildRobinUrls({});
          expect(robinUrls).to.deep.equal(mocks.urls.production);
        });
      });
      describe('object arg with env property set', function () {
        describe('empty string', function () {
          it('should build a valid production url object', function () {
            var robinUrls = rbnUtil.buildRobinUrls({
              env: ''
            });
            expect(robinUrls).to.deep.equal(mocks.urls.production);
          });
        });
        describe('undefined', function () {
          it('should build a valid production url object', function () {
            var robinUrls = rbnUtil.buildRobinUrls({
              env: undefined
            });
            expect(robinUrls).to.deep.equal(mocks.urls.production);
          });
        });
        describe('null', function () {
          it('should build a valid production url object', function () {
            var robinUrls = rbnUtil.buildRobinUrls({
              env: null
            });
            expect(robinUrls).to.deep.equal(mocks.urls.production);
          });
        });
        describe('production', function () {
          it('should build a valid production url object', function () {
            var robinUrls = rbnUtil.buildRobinUrls({
              env: 'production'
            });
            expect(robinUrls).to.deep.equal(mocks.urls.production);
          });
        });
        describe('staging', function () {
          it('should build a valid staging url object', function () {
            var robinUrls = rbnUtil.buildRobinUrls({
              env: 'staging'
            });
            expect(robinUrls).to.deep.equal(mocks.urls.staging);
          });
        });
        describe('test', function () {
          it('should build a valid test url object', function () {
            var robinUrls = rbnUtil.buildRobinUrls({
              env: 'test'
            });
            expect(robinUrls).to.deep.equal(mocks.urls.test);
          });
        });
      });
      describe('object arg with urls property', function () {
        describe('invalid urls property', function () {
          describe('string', function () {
            it('should throw an error', function () {
              expect(function () {
                rbnUtil.buildRobinUrls({
                  urls: 'invalid'
                });
              }).to.throw(TypeError);
            });
          });
          describe('array', function () {
            it('should throw an error', function () {
              expect(function () {
                rbnUtil.buildRobinUrls({
                  urls: [1,2,3]
                });
              }).to.throw(TypeError);
            });
          });
        });
        describe('null urls object', function () {
          it('should build a valid production url object', function () {
            var robinUrls = rbnUtil.buildRobinUrls({
              urls: null
            });
            expect(robinUrls).to.deep.equal(mocks.urls.production);
          });
        });
        describe('undefined urls object', function () {
          it('should build a valid production url object', function () {
            var robinUrls = rbnUtil.buildRobinUrls({
              urls: undefined
            });
            expect(robinUrls).to.deep.equal(mocks.urls.production);
          });
        });
        describe('empty urls object', function () {
          it('should build a valid production url object', function () {
            var robinUrls = rbnUtil.buildRobinUrls({
              urls: {}
            });
            expect(robinUrls).to.deep.equal(mocks.urls.production);
          });
        });
        describe('invalid urls object', function () {
          it('should throw an error', function () {
            expect(function () {
              rbnUtil.buildRobinUrls({
                urls: {
                  foo: 'http://localhost'
                }
              });
            }).to.throw(TypeError);
          });
        });
        describe('set grid url to local, others to production', function () {
          it('should create a custom set of urls', function () {
            var robinUrls = rbnUtil.buildRobinUrls({
              urls: {
                grid: 'http://localhost/robin-grid'
              }
            });
            expect(robinUrls.core).to.equal(validApiProductionUrl);
            expect(robinUrls.grid).to.equal('http://localhost/robin-grid');
            expect(robinUrls.places).to.equal(validAppsProductionUrl);
          });
        });
        describe('set core url to local, others to staging', function () {
          it('should create a custom set of urls', function () {
            var robinUrls = rbnUtil.buildRobinUrls({
              env: 'staging',
              urls: {
                core: 'http://localhost/robin-api'
              }
            });
            expect(robinUrls.core).to.equal('http://localhost/robin-api');
            expect(robinUrls.grid).to.equal(validGridStagingUrl);
            expect(robinUrls.places).to.equal(validAppsStagingUrl);
          });
        });
        describe('set places url to local, others to test', function () {
          it('should create a custom set of urls', function () {
            var robinUrls = rbnUtil.buildRobinUrls({
              env: 'test',
              urls: {
                places: 'http://localhost/robin-apps'
              }
            });
            expect(robinUrls.core).to.equal(validApiTestUrl);
            expect(robinUrls.grid).to.equal(validGridTestUrl);
            expect(robinUrls.places).to.equal('http://localhost/robin-apps');
          });
        });
      });
    });
  });
});
