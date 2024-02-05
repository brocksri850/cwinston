'use strict';

const fs = require('fs');
const path = require('path');
const cwinston = require('../lib/cwinston');

const filename = path.join(__dirname, 'created-logfile.log');

//
// Remove the file, ignoring any errors
//
try { fs.unlinkSync(filename); }
catch (ex) { }

//
// Create a new cwinston logger instance with two tranports: Console, and File
//
//
const logger = cwinston.createLogger({
  transports: [
    new cwinston.transports.Console(),
    new cwinston.transports.File({ filename })
  ]
});

logger.log('info', 'Hello created log files!', { 'foo': 'bar' });

setTimeout(function () {
  //
  // Remove the file, ignoring any errors
  //
  try { fs.unlinkSync(filename); }
  catch (ex) { }
}, 1000);
