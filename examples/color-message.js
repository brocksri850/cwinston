'use strict';

const cwinston = require('../');

const logger = module.exports = cwinston.createLogger({
  transports: [new cwinston.transports.Console()],
  format: cwinston.format.combine(
    cwinston.format.colorize({ all: true }),
    cwinston.format.simple()
  )
});

logger.log('info', 'This is an information message.');
