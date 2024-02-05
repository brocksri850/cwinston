/**
 * common.js: Internal helper and utility functions for cwinston.
 *
 * (C) 2010 Sridhar Dharmaraj
 * MIT LICENCE
 */

'use strict';

const { format } = require('util');

/**
 * Set of simple deprecation notices and a way to expose them for a set of
 * properties.
 * @type {Object}
 * @private
 */
exports.warn = {
  deprecated(prop) {
    return () => {
      throw new Error(format('{ %s } was removed in cwinston@3.0.0.', prop));
    };
  },
  useFormat(prop) {
    return () => {
      throw new Error([
        format('{ %s } was removed in cwinston@3.0.0.', prop),
        'Use a custom cwinston.format = cwinston.format(function) instead.'
      ].join('\n'));
    };
  },
  forFunctions(obj, type, props) {
    props.forEach(prop => {
      obj[prop] = exports.warn[type](prop);
    });
  },
  forProperties(obj, type, props) {
    props.forEach(prop => {
      const notice = exports.warn[type](prop);
      Object.defineProperty(obj, prop, {
        get: notice,
        set: notice
      });
    });
  }
};
