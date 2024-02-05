/*
 * log-rejections.js: A test fixture for logging rejections in cwinston.
 *
 * (C) 2011 Sridhar Dharmaraj
 * MIT LICENCE
 *
 */

var path = require("path"),
  cwinston = require("../../../lib/cwinston");
const testLogFixturesPath = path.join(__dirname, '..', '..', 'fixtures', 'logs');

var logger = cwinston.createLogger({
  transports: [
    new cwinston.transports.File({
      filename: path.join(testLogFixturesPath, "rejections.log"),
      handleRejections: true
    })
  ]
});

logger.rejections.handle();

setTimeout(function() {
  Promise.reject(new Error("OH NOES! It rejected!"));
}, 1000);
