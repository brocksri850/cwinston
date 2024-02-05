import * as cwinston from '../index';

let logger: cwinston.Logger = cwinston.createLogger({
    level: 'info',
    format: cwinston.format.json(),
    transports: [
        new cwinston.transports.Console({ level: 'info' }),
    ],
});

let err: Error = new Error('ttdt');
logger.error('The error was: ', err);
logger.log('info', 'hey dude', { foo: 'bar' });
logger.log({ level: 'info', message: 'hey dude', meta: { foo: 'bar' } });

// Default logger
cwinston.http('New incoming connection');
cwinston.error('The error was: ', err);

cwinston.exceptions.handle(new cwinston.transports.File({ filename: 'exceptions.log' }));

const loggerOptions: cwinston.LoggerOptions = {
    level: 'info',
    format: cwinston.format.json(),
    transports: [
        new cwinston.transports.Console({ level: 'info' }),
    ],
};

// assign the returned values to the logger variable,
// to make sure that the methods have 'Logger' declared as their return type
logger = cwinston.loggers.add('category', loggerOptions);
logger = cwinston.loggers.add('category');
logger = cwinston.loggers.get('category', loggerOptions);
logger = cwinston.loggers.get('category');

const hasLogger: boolean = cwinston.loggers.has('category');
cwinston.loggers.close('category');
cwinston.loggers.close();

let container: cwinston.Container = new cwinston.Container(loggerOptions);
logger = container.get('testLogger');

logger = container.loggers.get('testLogger')!;

container.close('testLogger');

const level = container.options.level;

container = new cwinston.Container();
logger = container.get('testLogger2');

logger.isLevelEnabled('debug');
logger.isErrorEnabled();
logger.isWarnEnabled();
logger.isInfoEnabled();
logger.isVerboseEnabled();
logger.isDebugEnabled();
logger.isSillyEnabled();
