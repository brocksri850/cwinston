/*
 * unhandle-exceptions.js: A test fixture for using `.unhandleExceptions()` cwinston.
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
      filename: path.join(testLogFixturesPath, 'unhandle-exception.log')
    })
  ]
});

logger.transports[0].transport.handleExceptions;

logger.exceptions.handle();
logger.exceptions.unhandle();

setTimeout(function () {
  throw new Error('OH NOES! It failed!');
}, 200);
