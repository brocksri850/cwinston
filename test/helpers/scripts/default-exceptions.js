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

cwinston.exceptions.handle([
  new cwinston.transports.File({
    filename: path.join(testLogFixturesPath, 'default-exception.log'),
    handleExceptions: true
  })
]);

cwinston.info('Log something before error');

setTimeout(function () {
  throw new Error('OH NOES! It failed!');
}, 1000);
