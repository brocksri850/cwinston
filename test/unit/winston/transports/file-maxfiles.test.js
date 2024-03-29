/*
 * file-maxfiles.test.js: Tests for instances of the File transport setting the max file size,
 * and setting a number for max files created.
 * maxSize * maxFiles = total storage used by cwinston.
 *
 * (C) 2011 Daniel Aristizabal
 * MIT LICENSE
 *
 */

/*
 TODO(invalid-test): test is no longer valid as we don't have the vows dependency anymore
var assert = require('assert'),
    exec = require('child_process').exec,
    fs = require('fs'),
    path = require('path'),
    vows = require('vows'),
    cwinston = require('../../../../lib/cwinston'),
    helpers = require('../../../helpers');
const testLogFixturesPath = path.join(__dirname, '..', '..', '..', 'fixtures', 'logs');

var maxfilesTransport = new cwinston.transports.File({
  timestamp: false,
  json: false,
  filename: path.join(testLogFixturesPath, 'testmaxfiles.log'),
  maxsize: 4096,
  maxFiles: 3
});

vows.describe('cwinston/transports/file/maxfiles').addBatch({
  "An instance of the File Transport": {
    "when passed a valid filename": {
      topic: maxfilesTransport,
      "should set the maxFiles option correctly": function (transportTest) {
        assert.isNumber(transportTest.maxFiles);
      }
    },
    "when delete old test files": {
      topic: function () {
        exec('rm -rf ' + path.join(testLogFixturesPath, 'testmaxfiles*'), this.callback);
      },
      "and when passed more files than the maxFiles": {
        topic: function () {
          var that = this,
              created = 0;

          function data(ch) {
            return new Array(1018).join(String.fromCharCode(65 + ch));
          };

          function logKbytes(kbytes, txt) {
            //
            // With no timestamp and at the info level,
            // cwinston adds exactly 7 characters:
            // [info](4)[ :](2)[\n](1)
            //
            for (var i = 0; i < kbytes; i++) {
              maxfilesTransport.log('info', data(txt), null, function () { });
            }
          }

          maxfilesTransport.on('logged', function () {
            if (++created === 6) {
              return that.callback();
            }

            logKbytes(4, created);
          });

          logKbytes(4, created);
        },
        "should be only 3 files called 5.log, 4.log and 3.log": function () {
          for (var num = 0; num < 6; num++) {
            var file = !num ? 'testmaxfiles.log' : 'testmaxfiles' + num + '.log',
                fullpath = path.join(testLogFixturesPath, file);

            // There should be no files with that name
            if (num >= 0 && num < 3) {
              assert.throws(function () {
                fs.statSync(fullpath);
              }, Error);
            } else {
              // The other files should be exist
              assert.doesNotThrow(function () {
                fs.statSync(fullpath);
              }, Error);
            }
          }
        },
        "should have the correct content": function () {
          ['D', 'E', 'F'].forEach(function (name, inx) {
            var counter = inx + 3,
                content = fs.readFileSync(path.join(testLogFixturesPath, 'testmaxfiles' + counter + '.log'), 'utf-8');
            // The content minus the 7 characters added by cwinston
            assert.lengthOf(content.match(new RegExp(name, 'g')), 4068);
          });
        }
      }
    }
  }
}).export(module);
*/
