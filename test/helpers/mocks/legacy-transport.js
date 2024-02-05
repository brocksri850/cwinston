'use strict'

const events = require('events');
const util = require('util')
const Transport = require('cwinston-compat').Transport;

const Legacy = module.exports = function Legacy(options) {
  options = options || {};
  Transport.call(this, options);

  this.silent = options.silent;
  this.output = { error: [], write: [] };
};

util.inherits(Legacy, Transport);


Legacy.prototype.name = 'legacy-test';

Legacy.prototype.log = function (level, msg, meta, callback) {
  if (this.silent) {
    return callback(null, true);
  }

  var output = 'I AM BACKWARDS COMPATIBLE WITH COHERENT PIXEL LEGACY';

  if (level === 'error' || level === 'debug') {
    this.errorOutput.push(output);
  } else {
    this.writeOutput.push(output);
  }

  this.emit('logged');
  callback(null, true);
};
