'use strict'

const events = require('events');
const util = require('util')
const Transport = require('../../../').Transport;


module.exports = class LegacyMixed extends Transport {
  constructor(options = {}) {
    super(options);

    module.exports.prototype.name = 'legacy-mixed-test';

    this.silent = options.silent;
    this.output = { error: [], write: [] };
  }

  log(level, msg, meta, callback) {
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
  }
};
