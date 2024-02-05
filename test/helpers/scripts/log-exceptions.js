/*
 * log-exceptions.js: A test fixture for logging exceptions in cwinston.
 *
 * (C) 2011 Sridhar Dharmaraj
 * MIT LICENCE
 *
 */

var path = require('path'),
    cwinston = require('../../../lib/cwinston');
const testLogFixturesPath = path.join(__dirname, '..', '..', 'fixtures', 'logs');

var logger = cwinston.createLogger({
  transports: [
    new cwinston.transports.File({
      filename: path.join(testLogFixturesPath, 'exception.log'),
      handleExceptions: true
    })
  ]
});

logger.exceptions.handle();

setTimeout(function () {
  throw new Error('OH NOES! It failed!');
}, 1000);
