'use strict';

const cwinston = require('../');

//
// As of cwinston@3, the default logging format is JSON.
//
const logger = cwinston.createLogger({
  transports: [
    new cwinston.transports.Console(),
  ]
});

logger.log('info', 'Hello, this is a raw logging event',   { 'foo': 'bar' });
logger.log('info', 'Hello, this is a raw logging event 2', { 'foo': 'bar' });
