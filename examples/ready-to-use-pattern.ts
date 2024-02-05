const cwinston = require('../');

const config = {
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    info: 4,
    verbose: 5,
    silly: 6
  },
  colors: {
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    data: 'magenta',
    info: 'green',
    verbose: 'cyan',
    silly: 'grey'
  }
};

cwinston.addColors(config.colors);
const wLogger = (input: { logName: string; level: string }): cwinston.Logger =>
  cwinston.createLogger({
    levels: config.levels,
    level: `${input.level}`,
    transports: [
      new cwinston.transports.Console({
        level: `${input.level}`,

        format: cwinston.format.combine(
          cwinston.format.printf(
            info =>
              // https://stackoverflow.com/a/69044670/20358783 more detailLocaleString
              `${new Date(info.timestamp).toLocaleDateString('tr-Tr', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
              })} ${info.level.toLocaleUpperCase()}: ${info.message}`
          ),
          cwinston.format.colorize({ all: true })
        )
      }),
      new cwinston.transports.File({
        filename: `./src/logs/${input.logName}/${input.logName}-Error.log`,
        level: 'error',
        format: cwinston.format.printf(
          info =>
            `${new Date(info.timestamp).toLocaleDateString('tr-Tr', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            })} ${info.level.toLocaleUpperCase()}: ${info.message}`
        )
      }),
      new cwinston.transports.File({
        filename: `./src/logs/${input.logName}/${input.logName}-Warn.log`,
        level: 'warn',
        format: cwinston.format.printf(
          info =>
            `${new Date(info.timestamp).toLocaleDateString('tr-Tr', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            })} ${info.level.toLocaleUpperCase()}: ${info.message}`
        )
      }),
      new cwinston.transports.File({
        filename: `./src/logs/${input.logName}/${input.logName}-All.log`,
        level: 'silly',
        format: cwinston.format.printf(
          info =>
            `${new Date(info.timestamp).toLocaleDateString('tr-Tr', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            })} ${info.level.toLocaleUpperCase()}: ${info.message}`
        )
      }),

      new cwinston.transports.File({
        format: cwinston.format.printf(
          info =>
            `${new Date(info.timestamp).toLocaleDateString('tr-Tr', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            })} ${info.level.toLocaleUpperCase()}: ${info.message}`
        ),
        filename: './src/logs/globalLog.log',
        level: 'silly'
      })
    ]
  });

export default wLogger;

//const logger = wLogger({ logName: moduleName, level: logLevel })
//logger.info('test')
