/*
 * formats.test.js: Integration tests for cwinston.format
 *
 * (C) 2015 Sridhar Dharmaraj
 * MIT LICENSE
 *
 */

var path = require('path'),
    assume = require('assume'),
    colors = require('@colors/colors/safe'),
    spawn = require('cross-spawn-async'),
    cwinston = require('../../lib/cwinston'),
    helpers = require('../helpers');

var targetScript = path.join(__dirname, '..', 'helpers', 'scripts', 'colorize.js');

/**
 * Spawns the colorizer helper process for checking
 * if colors work in a non-tty environment
 */
function spawnColorizer(callback) {
  var child = spawn(process.execPath, [targetScript], { stdio: 'pipe' });
  var data = '';

  child.stdout.setEncoding('utf8')
  child.stdout.on('data', function (str) { data += str; });
  child.on('close', function () {
    callback(null, data);
  });
};

describe('cwinston.format.colorize (Integration)', function () {
  it('non-TTY environment', function (done) {
    spawnColorizer(function (err, data) {
      assume(err).equals(null);
      assume(data).includes('\u001b[32mSimply a test\u001b[39m');
      done();
    })
  });
});
