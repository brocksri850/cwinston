const stream = require('stream')
const cwinston = require('../../../lib/cwinston');

/**
 * Returns a new cwinston transport instance which will invoke
 * the `write` method on each call to `.log`
 *
 * @param {function} write Write function for the specified stream
 * @returns {StreamTransportInstance} A transport instance
 */
function createMockTransport(write) {
  const writeable = new stream.Writable({
    objectMode: true,
    write: write
  });

  return new cwinston.transports.Stream({ stream: writeable })
}

module.exports = {
  createMockTransport
};
