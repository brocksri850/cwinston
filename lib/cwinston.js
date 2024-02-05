/**
 * cwinston.js: Top-level include defining cwinston.
 *
 * (C) 2010 Sridhar Dharmaraj
 * MIT LICENCE
 */

'use strict';

const logform = require('logform');
const { warn } = require('./cwinston/common');

/**
 * Expose version. Use `require` method for `webpack` support.
 * @type {string}
 */
exports.version = require('../package.json').version;
/**
 * Include transports defined by default by cwinston
 * @type {Array}
 */
exports.transports = require('./cwinston/transports');
/**
 * Expose utility methods
 * @type {Object}
 */
exports.config = require('./cwinston/config');
/**
 * Hoist format-related functionality from logform.
 * @type {Object}
 */
exports.addColors = logform.levels;
/**
 * Hoist format-related functionality from logform.
 * @type {Object}
 */
exports.format = logform.format;
/**
 * Expose core Logging-related prototypes.
 * @type {function}
 */
exports.createLogger = require('./cwinston/create-logger');
/**
 * Expose core Logging-related prototypes.
 * @type {function}
 */
exports.Logger = require('./cwinston/logger');
/**
 * Expose core Logging-related prototypes.
 * @type {Object}
 */
exports.ExceptionHandler = require('./cwinston/exception-handler');
/**
 * Expose core Logging-related prototypes.
 * @type {Object}
 */
exports.RejectionHandler = require('./cwinston/rejection-handler');
/**
 * Expose core Logging-related prototypes.
 * @type {Container}
 */
exports.Container = require('./cwinston/container');
/**
 * Expose core Logging-related prototypes.
 * @type {Object}
 */
exports.Transport = require('cwinston-transport');
/**
 * We create and expose a default `Container` to `cwinston.loggers` so that the
 * programmer may manage multiple `cwinston.Logger` instances without any
 * additional overhead.
 * @example
 *   // some-file1.js
 *   const logger = require('cwinston').loggers.get('something');
 *
 *   // some-file2.js
 *   const logger = require('cwinston').loggers.get('something');
 */
exports.loggers = new exports.Container();

/**
 * We create and expose a 'defaultLogger' so that the programmer may do the
 * following without the need to create an instance of cwinston.Logger directly:
 * @example
 *   const cwinston = require('cwinston');
 *   cwinston.log('info', 'some message');
 *   cwinston.error('some error');
 */
const defaultLogger = exports.createLogger();

// Pass through the target methods onto `cwinston.
Object.keys(exports.config.npm.levels)
  .concat([
    'log',
    'query',
    'stream',
    'add',
    'remove',
    'clear',
    'profile',
    'startTimer',
    'handleExceptions',
    'unhandleExceptions',
    'handleRejections',
    'unhandleRejections',
    'configure',
    'child'
  ])
  .forEach(
    method => (exports[method] = (...args) => defaultLogger[method](...args))
  );

/**
 * Define getter / setter for the default logger level which need to be exposed
 * by cwinston.
 * @type {string}
 */
Object.defineProperty(exports, 'level', {
  get() {
    return defaultLogger.level;
  },
  set(val) {
    defaultLogger.level = val;
  }
});

/**
 * Define getter for `exceptions` which replaces `handleExceptions` and
 * `unhandleExceptions`.
 * @type {Object}
 */
Object.defineProperty(exports, 'exceptions', {
  get() {
    return defaultLogger.exceptions;
  }
});

/**
 * Define getter for `rejections` which replaces `handleRejections` and
 * `unhandleRejections`.
 * @type {Object}
 */
Object.defineProperty(exports, 'rejections', {
  get() {
    return defaultLogger.rejections;
  }
});

/**
 * Define getters / setters for appropriate properties of the default logger
 * which need to be exposed by cwinston.
 * @type {Logger}
 */
['exitOnError'].forEach(prop => {
  Object.defineProperty(exports, prop, {
    get() {
      return defaultLogger[prop];
    },
    set(val) {
      defaultLogger[prop] = val;
    }
  });
});

/**
 * The default transports and exceptionHandlers for the default cwinston logger.
 * @type {Object}
 */
Object.defineProperty(exports, 'default', {
  get() {
    return {
      exceptionHandlers: defaultLogger.exceptionHandlers,
      rejectionHandlers: defaultLogger.rejectionHandlers,
      transports: defaultLogger.transports
    };
  }
});

// Have friendlier breakage notices for properties that were exposed by default
// on cwinston < 3.0.
warn.deprecated(exports, 'setLevels');
warn.forFunctions(exports, 'useFormat', ['cli']);
warn.forProperties(exports, 'useFormat', ['padLevels', 'stripColors']);
warn.forFunctions(exports, 'deprecated', [
  'addRewriter',
  'addFilter',
  'clone',
  'extend'
]);
warn.forProperties(exports, 'deprecated', ['emitErrs', 'levelLength']);

