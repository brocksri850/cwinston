'use strict';

const cwinston = require('../');

const logger = cwinston.createLogger({
  level: 'info',
  format: cwinston.format.combine(
    //
    // Notice that both arguments have been combined into a single
    // "info" object.
    //
    cwinston.format(function (info, opts) {
      console.log(`{ reason: ${info.reason}, promise: ${info.promise} }`);
      return info;
    })(),
    cwinston.format.json()
  ),
  transports: [
    new cwinston.transports.Console()
  ]
});

logger.info('my message', { reason: 'whatever', promise: 'whenever' });
