var Twitter = require('twitter');
var logger = require('../utils/logger/twitter');

var redis = require('./db');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var twitter_track = {
  track: 'aniesbaswedan,sandiuno,DKIJakarta',
  follow: '110312278,132041617,166014938'
}

var stream = client.stream('statuses/filter', twitter_track);

exports.listen = function() {
  stream.on('data', function(event) {
    logger.info(event);
    redis.publish("tweet", event);
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
