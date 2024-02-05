```

## Installation

``` bash
npm install cwinston
```

``` bash
yarn add cwinston
```

## Run Tests

All of the cwinston tests are written with [`mocha`][mocha], [`nyc`][nyc], and
[`assume`][assume].  They can be run with `npm`.

``` bash
npm test
```

## Usage

The recommended way to use `cwinston` is to create your own logger. The
simplest way to do this is using `cwinston.createLogger`:

``` js
const cwinston = require('cwinston');

const logger = cwinston.createLogger({
  level: 'info',
  format: cwinston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new cwinston.transports.File({ filename: 'error.log', level: 'error' }),
    new cwinston.transports.File({ filename: 'combined.log' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new cwinston.transports.Console({
    format: cwinston.format.simple(),
  }));
}
```

You may also log directly via the default logger exposed by
`require('cwinston')`, but this merely intended to be a convenient shared
logger to use throughout your application if you so choose.
Note that the default logger doesn't have any transports by default.
You need add transports by yourself, and leaving the default logger without any
transports may produce a high memory usage issue.


#### Author: [Sridhar Dharmaraj]