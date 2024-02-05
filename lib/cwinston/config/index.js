/**
 * index.js: Default settings for all levels that cwinston knows about.
 *
 * (C) 2010 Sridhar Dharmaraj
 * MIT LICENCE
 */

'use strict';

const logform = require('logform');
const { configs } = require('triple-beam');

/**
 * Export config set for the CLI.
 * @type {Object}
 */
exports.cli = logform.levels(configs.cli);

/**
 * Export config set for npm.
 * @type {Object}
 */
exports.npm = logform.levels(configs.npm);

/**
 * Export config set for the syslog.
 * @type {Object}
 */
exports.syslog = logform.levels(configs.syslog);

/**
 * Hoist addColors from logform where it was refactored into in cwinston@3.
 * @type {Object}
 */
exports.addColors = logform.levels;
