const router = require('express').Router();
const Twit = require('twit')
const moment = require('moment');

const twitSecret = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
}

const T = new Twit(twitSecret);

// USER TIMELINE TWEETS

router.get('/', (req, res, next) => {
  var twitterHandle = req.query.twitterHandle;
  if (twitterHandle) {
    T.get('statuses/user_timeline',
      {
        screen_name: `${twitterHandle}`,
        count: 200
      }, (err, data, response) => {
        res.send(data)
      });
  }
});

module.exports = router;