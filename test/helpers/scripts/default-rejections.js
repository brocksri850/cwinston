/*
 * default-rejectionss.js: A test fixture for logging rejections with the default cwinston logger.
 *
 * (C) 2011 Sridhar Dharmaraj
 * MIT LICENCE
 *
 */

var path = require("path"),
  cwinston = require("../../../lib/cwinston");
const testLogFixturesPath = path.join(__dirname, '..', '..', 'fixtures', 'logs');

cwinston.rejections.handle([
  new cwinston.transports.File({
    filename: path.join(testLogFixturesPath, "default-rejection.log"),
    handleRejections: true
  })
]);

cwinston.info("Log something before error");

setTimeout(function() {
  Promise.reject(new Error("OH NOES! It rejected!"));
}, 1000);
