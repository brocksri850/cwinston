/* eslint-disable no-sync */
const assert = require('assert');
const { rimraf } = require('rimraf');
const fs = require('fs');
const path = require('path');
const cwinston = require('../../../../lib/cwinston');
const testLogFixturesPath = path.join(__dirname, '..', '..', '..', 'fixtures', 'logs');

const { MESSAGE } = require('triple-beam');

//
// Remove all log fixtures
//
function removeFixtures(done) {
  rimraf(path.join(testLogFixturesPath, 'testtailrollingfiles*'), {glob: true}).then(() => done());
}



let tailrollTransport = null;

describe('cwinston/transports/file/tailrolling', function () {
  describe('An instance of the File Transport', function () {
    before(removeFixtures);
    after(removeFixtures);

    it('init logger AFTER cleaning up old files', function () {
      tailrollTransport = new cwinston.transports.File({
        timestamp: false,
        json: false,
        filename: path.join(testLogFixturesPath, 'testtailrollingfiles.log'),
        maxsize: 4096,
        maxFiles: 3,
        tailable: true
      })
        .on('open', console.log); // eslint-disable-line no-console
    });

    it('and when passed more files than the maxFiles', function (done) {
      let created = 0;
      let loggedTotal = 0;

      function data(ch, kb) {
        return String.fromCharCode(65 + ch).repeat(kb * 1024 - 1);
      }

      function logKbytes(kbytes, txt) {
        const toLog = {};
	      toLog[MESSAGE] = data(txt, kbytes);
        tailrollTransport.log(toLog);
      }

      tailrollTransport.on('logged', function (info) {
        loggedTotal += info[MESSAGE].length + 1;
        if (loggedTotal >= 14 * 1024) { // just over 3 x 4kb files
          return done();
        }

        if (loggedTotal % 4096 === 0) {
          created++;
        }
        // eslint-disable-next-line max-nested-callbacks
        setTimeout(() => logKbytes(1, created), 1);
      });

      logKbytes(1, created);
    });

    it('should be 3 log files, base to maxFiles - 1', function () {
      for (var num = 0; num < 4; num++) {
        const file = !num ? 'testtailrollingfiles.log' : 'testtailrollingfiles' + num + '.log';
        const fullpath = path.join(testLogFixturesPath, file);

        if (num === 3) {
          return assert.ok(!fs.existsSync(fullpath));
        }

        assert.ok(fs.existsSync(fullpath));
      }

      return false;
    });

    it('should have files in correct order', function () {
      ['D', 'C', 'B'].forEach(function (letter, i) {
        const file = !i ? 'testtailrollingfiles.log' : 'testtailrollingfiles' + i + '.log';
        let content = fs.readFileSync(path.join(testLogFixturesPath, file), 'ascii');
        content = content.replace(/\s+/g, '');

        assert(content.match(new RegExp(letter, 'g'))[0].length, content.length);
      });
    });
  });
});
