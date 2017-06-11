var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var twitter_track = {
	track: 'javascript,jokowi,ahok,aniesbaswedan,prabowo,megawati,pemilu'
}

var stream = client.stream('statuses/filter', twitter_track);

exports.listen = function() {
	stream.on('data', function(event) {
	  console.log(event && event.text);
	  // console.log(JSON.stringify(event.text));
	});
	 
	stream.on('error', function(error) {
	  stream.destroy();
	  throw error;
	});
}

exports.onDestroy = function(options, err) {
	console.log("Closing twitter stream");
	stream.destroy();
}