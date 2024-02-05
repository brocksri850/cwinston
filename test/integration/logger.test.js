const assume = require('assume');
const cwinston = require('../../lib/cwinston');

const Logger = cwinston.Logger;

describe('Logger class', () => {
  it('that Logger class is exported', () => {
    Logger === require('../../lib/cwinston/logger');
  });

  it('can be inherited', () => {
    class CustomLogger extends Logger {}
    const instance = new CustomLogger();
    assume(instance).instanceOf(CustomLogger);
    assume(instance).instanceOf(Logger);
  });
});
