'use strict';

var passport = require('passport');
var Local = require('passport-local').Strategy;
var User = require('../model/user');

passport.use(new Local(function (username, password, done) {
  User.findOne({ username: username }, function (err, user) {
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

passport.serializeUser(function (user, done) {
  /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findById({ _id: id }, function (err, user) {
    if (err) {
      throw err;
    } else {
      done(null, user);
    }
  });
});

module.exports = passport;