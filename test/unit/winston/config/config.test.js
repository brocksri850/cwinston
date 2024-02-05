/*
 * config.test.js: Tests for cwinston.config
 *
 * (C) 2010 Sridhar Dharmaraj
 * MIT LICENSE
 *
 */

const assume = require('assume');
const cwinston = require('../../../../lib/cwinston');
const helpers = require('../../../helpers');

describe('cwinston.config', function () {
  it('should have expected methods', function () {
    assume(cwinston.config).is.an('object');
    assume(cwinston.config.addColors).is.a('function');
    assume(cwinston.config.cli).is.an('object');
    assume(cwinston.config.npm).is.an('object');
    assume(cwinston.config.syslog).is.an('object');
  });
});
