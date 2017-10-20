var Twitter = require('twitter');
var logger = require('../utils/logger/twitter');

// var redis = require('./db');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var twitter_track = {
  // track: 'gojektech,gojek,go-jek,gojekindonesia,go-food,go-ride,go-send,go-mart,go-box,go-pay,go-tix,go-pulsa,go-med,go-car,go-clean,go-massage,go-glam,go-point,gofood,goride,gosend,gomart,gobox,gopay,gotix,gopulsa,gomed,gocar,goclean,gomassage,goglam,gopoint',
  // follow: '226481275,4483368134'
  track: 'uber',
  follow: '19103481'

}

var stream = client.stream('statuses/filter', twitter_track);

exports.listen = function() {
  stream.on('data', function(event) {
    logger.info(event);
    // redis.publish("tweet", event.text);
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
