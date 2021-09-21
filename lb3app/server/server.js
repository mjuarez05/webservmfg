'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var errorHandler = require('strong-error-handler');
var bunyan = require('bunyan');
const helmet = require('helmet');
// var rootLogger = bunyan.createLogger({name: 'brfwebapp'});
var rootLogger = bunyan.createLogger({
  name: 'brfwebapp',
  streams: [
    {
      level: 'info',
      stream: process.stdout, // log INFO and above to stdout
    },
    {
      level: 'error',
      path: './marfrigwebapp.log', // log ERROR and above to a file
    },
  ],
});
var logger = require('loopback-component-logger')(rootLogger);
var app = (module.exports = loopback());
console.log('MODE: ' + app.get('env'));
app.use(
  errorHandler({
    debug: app.get('env') === 'development',
    log: true,
  })
);
app.use(helmet());
app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module) app.start();
});
