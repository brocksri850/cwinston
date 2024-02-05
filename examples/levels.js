'use strict';

const cwinston = require('../');

const defaultLevels = cwinston.createLogger({
  level: 'silly',
  format: cwinston.format.simple(),
  transports: new cwinston.transports.Console()
});

function logAllLevels() {
  Object.keys(cwinston.config.npm.levels).forEach(level => {
    defaultLevels[level](`is logged when logger.level="${defaultLevels.level}"`);
  });
}

logAllLevels();

//
// TODO: THIS IS BROKEN & MUST BE FIXED BEFORE 3.0
// Logger.prototype.level must be a setter to set the
// default level on all Transports.
//
defaultLevels.level = 'error';
logAllLevels();
