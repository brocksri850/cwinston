```

## Installation

npm install c_cwinston

## Usage

The recommended way to use `cwinston` is to create your own logger. The
simplest way to do this is using `cwinston.createLogger`:

``` js
// Import the cwinston library
const cwinston = require('cwinston');

// Create a custom logger using cwinston.createLogger
const logger = cwinston.createLogger({
  level: 'info', // Set log level to 'info'
  format: cwinston.format.json(), // Use JSON format for logs
  defaultMeta: { service: 'user-service' }, // Set default metadata for logs
  transports: [
    // Define transports for log storage
    new cwinston.transports.File({ filename: 'error.log', level: 'error' }), // Log errors to 'error.log'
    new cwinston.transports.File({ filename: 'combined.log' }), // Log info and above to 'combined.log'
  ],
});

// Add a console transport for logging in non-production environments
if (process.env.NODE_ENV !== 'production') {
  logger.add(new cwinston.transports.Console({
    format: cwinston.format.simple(), // Use simple format for console logs
  }));
}
```


 The default logger exposed by `require('cwinston')` can also be used
 It is intended as a convenient shared logger throughout the application
 `Note: The default logger doesn't have any transports by default
 You need to add transports yourself to avoid high memory usage`

 Example of using the default logger:
 `cwinston.log('info', 'This is an info message'); `

 It's recommended to use the custom logger `(logger)` for better control and configurability

#### Author: [Sridhar Dharmaraj]