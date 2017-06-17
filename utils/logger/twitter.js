var winston = require('winston');
require('winston-daily-rotate-file');

var transport = new winston.transports.DailyRotateFile({
  name: 'twitter-log',
  filename: './logs/twitter/log',
  datePattern: 'yyyy-MM-dd.',
  prepend: true,
  level: 'info',
  handleExceptions: true,
  humanReadableUnhandledException: true
})

var logger = new (winston.Logger)({
  transports: [
    transport
  ],
  exitOnError: false
})

module.exports = {
  info: function(data) {
    logger.info('twitter', {data:data});
  },
  error: function(err) {
    logger.error(err);
  }
}
