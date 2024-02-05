/*
 * default-exceptions.js: A test fixture for logging exceptions with the default cwinston logger.
 *
 * (C) 2011 Sridhar Dharmaraj
 * MIT LICENCE
 *
 */

var path = require('path'),
    cwinston = require('../../../lib/cwinston');
const testLogFixturesPath = path.join(__dirname, '..', '..', 'fixtures', 'logs');

cwinston.exitOnError = function (err) {
  process.stdout.write(err.message);
  return err.message !== 'Ignore this error';
};

cwinston.handleExceptions([
  new cwinston.transports.File({
    filename: path.join(testLogFixturesPath, 'exit-on-error.log'),
    handleExceptions: true
  })
]);

setTimeout(function () {
  throw new Error('Ignore this error');
}, 100);
