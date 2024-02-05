'use strict';

const cwinston = require('../');

//
// TODO: THIS IS BROKEN & MUST BE FIXED BEFORE 3.0
// This should output what was previously referred to
// as "humanReadableUncaughtExceptions" by default.
//
const logger = cwinston.createLogger({
  format: cwinston.format.simple(),
  transports: [
    new cwinston.transports.Console({ handleExceptions: true })
  ]
});

throw new Error('Hello, cwinston!');
