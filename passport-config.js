const passport = require('passport');
const GitHubStrategy =  require('passport-github2').Strategy;
require('dotenv').config()

passport.serializeUser(function(obj, done){
    done(null, user)
})

passport.deserializeUser(function(obj, done){
    done(null, obj)
})

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    //User.findOrCreate({ githubId: profile.id }, function (err, user) {
        console.log(profile)
      return done(err, profile.id);
    })
);

module.exports = passport;