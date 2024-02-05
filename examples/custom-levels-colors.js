'use strict';

const cwinston = require('../lib/cwinston');

//
// Logging levels
//
const config = {
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    info: 4,
    verbose: 5,
    silly: 6,
    custom: 7
  },
  colors: {
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    data: 'grey',
    info: 'green',
    verbose: 'cyan',
    silly: 'magenta',
    custom: 'yellow'
  }
};

cwinston.addColors(config.colors);

const logger = module.exports = cwinston.createLogger({
  levels: config.levels,
  format: cwinston.format.combine(
    cwinston.format.colorize(),
    cwinston.format.simple()
  ),
  transports: [
    new cwinston.transports.Console()
  ],
  level: 'custom'
});

logger.custom('hello')
