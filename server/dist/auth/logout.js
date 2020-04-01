'use strict';

exports.logout = function (req, res) {
  // this function remove user from req
  req.logout();
  res.redirect('/');
};