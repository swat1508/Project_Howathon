const passport = require('passport');
const Local = require('passport-local').Strategy;
const User = require('../model/user');

passport.use(new Local((username, password, done) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, { message: '' });
    }
    if (user.password !== password) {
      return done(null, false, { message: '' });
    }
    return done(null, user);
  });
}));

passport.serializeUser((user, done) => {
  /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById({ _id: id }, (err, user) => {
    if (err) {
      throw err;
    } else {
      done(null, user);
    }
  });
});

module.exports = passport;
