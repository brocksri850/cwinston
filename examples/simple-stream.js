'use strict';

const fs = require('fs');
const path = require('path');
const cwinston = require('../lib/cwinston');

const filePath = path.join(__dirname, 'cwinston.log');
const stream = fs.createWriteStream(filePath);

const logger = cwinston.createLogger({
  transports: [
    new cwinston.transports.Stream({ stream })
  ]
});

setTimeout(() => {
  logger.log({ level: 'info', message: 'foo' });
  logger.log({ level: 'info', message: 'bar' });
}, 1000);

setTimeout(() => {
  try {
    fs.unlinkSync(filePath); // eslint-disable-line no-sync
  } catch (ex) {} // eslint-disable-line no-empty
}, 2000);
