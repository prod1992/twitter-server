const express = require("express");
const passport = require("passport");
const Twitter = require("twitter");
const TwitterTokenStrategy = require("passport-twitter-token");

let client,
  config = {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET
  };

passport.use(
  new TwitterTokenStrategy(config, (token, tokenSecret, profile, done) => {
    config.token = token;
    config.tokenSecret = tokenSecret;
    client = Twitter(config);
  })
);

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/home-timeline", (req, res, next) => {
  client.get("statuses/home_timeline", function(err, data, response) {
    res.send(data);
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server listening on port 5000");
});
