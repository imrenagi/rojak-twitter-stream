var Twitter = require('twitter');
var logger = require('../utils/logger/twitter');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var twitter_track = {
  track: 'jokowi,aniesbaswedan,megawati,pemilu',
  follow: '978808357,157604142'
}

var stream = client.stream('statuses/filter', twitter_track);

exports.listen = function() {
  stream.on('data', function(event) {
    logger.info(event.text);
  });

  stream.on('error', function(error) {
    logger.error(error);
    throw error;
  });
}

exports.onDestroy = function(options, err) {
  logger.error("Closing twitter stream");
  stream.destroy();
}
