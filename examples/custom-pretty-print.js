'use strict';

const cwinston = require('../');

const logger = cwinston.createLogger({
  format: cwinston.format.printf(info => {
    return JSON.stringify(info)
      .replace(/\{/g, '< wow ')
      .replace(/\:/g, ' such ')
      .replace(/\}/g, ' >')
  }),
  transports: [
    new cwinston.transports.Console(),
  ]
});

logger.info('Hello, this is a logging event with a custom pretty print',  { 'foo': 'bar' });
logger.info('Hello, this is a logging event with a custom pretty print2', { 'foo': 'bar' });

