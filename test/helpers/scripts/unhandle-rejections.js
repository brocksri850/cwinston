/*
 * unhandle-rejections.js: A test fixture for using `.unhandleRejections()` cwinston.
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
      filename: path.join(testLogFixturesPath, 'unhandle-rejections.log')
    })
  ]
});

logger.transports[0].transport.handleRejections;

logger.rejections.handle();
logger.rejections.unhandle();

setTimeout(function () {
  Promise.reject(new Error('OH NOES! It rejected!'));
}, 200);
