const cwinston = require('../');

const loggers = {
  splat: cwinston.createLogger({
    level: 'info',
    format: cwinston.format.combine(
      cwinston.format.splat(),
      cwinston.format.simple()
    ),
    transports: [new cwinston.transports.Console()],
  }),
  simple: cwinston.createLogger({
    level: 'info',
    format: cwinston.format.simple(),
    transports: [new cwinston.transports.Console()],
  })
};

const meta = {
  subject: 'Hello, World!',
  message: 'This message is a unique property separate from implicit merging.',
};

loggers.simple.info('email.message is hidden', meta);
loggers.simple.info('email.message is hidden %j\n', meta);

loggers.splat.info('This is overridden by meta', meta);
loggers.splat.info('email.message is shown %j', meta);
