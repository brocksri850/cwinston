/*
 * logger-test.js: Tests for instances of the cwinston Logger
 *
 * (C) 2010 Sridhar Dharmaraj
 * MIT LICENSE
 *
 */

const { format } = require('util');
const assume = require('assume');
const cwinston = require('../../lib/cwinston');

describe('cwinston', function () {

  it('cwinston.transports', function () {
    assume(cwinston.transports).is.an('object');
    assume(cwinston.Transport).is.a('function');
    assume(!cwinston.transports.Transport).true();
    assume(cwinston.transports.Console).is.a('function');
    assume(cwinston.transports.File).is.a('function');
  });

  it('has expected initial state', function () {
    assume(cwinston.default.transports).deep.equals([]);
    assume(cwinston.level).equals('info');
  });

  it('has expected methods', function () {
    assume(cwinston.config).is.an('object');
    ['createLogger', 'add', 'remove', 'clear', 'child']
      .concat(Object.keys(cwinston.config.npm.levels))
      .forEach(function (key) {
        assume(cwinston[key]).is.a('function', 'cwinston.' + key);
      });
  });

  it('exposes version', function () {
    assume(cwinston.version).equals(require('../../package.json').version);
  });

  it('abstract-cwinston-logger');

  //
  // TODO: Migrate this test once abstract-cwinston-{transport,logger}
  // test suite modules are completed.
  //
  // "the log() method": helpers.testNpmLevels(cwinston, "should respond without an error", function (err) {
  //   assert.isNull(err);
  // })

  describe('deprecates cwinston < 3.0.0 properties', function () {
    var deprecated = {
      functions: ['addRewriter', 'addFilter', 'cli', 'clone', 'extend'],
      properties: ['emitErrs', 'levelLength', 'padLevels', 'stripColors']
    };

    deprecated.functions.forEach(function (prop) {
      it(format('.%s()', prop), function () {
        assume(cwinston[prop]).throws();
      });
    });

    deprecated.properties.forEach(function (prop) {
      it(format('.%s', prop), function () {
        assume(function () {
          var value = cwinston[prop];
        }).throws();
      });
    });
  });
});
