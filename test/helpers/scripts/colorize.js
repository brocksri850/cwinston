/*
 * colorize.js: A test fixture for logging colorized messages
 *
 * (C) 2015 Tom Spencer
 * MIT LICENCE
 *
 */

var cwinston = require('../../../lib/cwinston');

var format = cwinston.format.combine(
  cwinston.format.colorize({ message: true }),
  cwinston.format.simple()
);

var logger = cwinston.createLogger({
  format: format,
  transports: [
    new cwinston.transports.Console()
  ]
});

logger.info('Simply a test');
