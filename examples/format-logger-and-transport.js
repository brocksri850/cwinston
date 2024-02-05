const fs = require('fs');
const cwinston = require('../');
const { createLogger, format, transports } = cwinston;

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.simple()
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp(),
        format.colorize(),
        format.simple()
      )
    }),
    new transports.Stream({
      stream: fs.createWriteStream('./example.log')
    })
  ]
})

logger.log({
  level: 'info',
  message: 'Check example.log – it will have no colors!'
});
