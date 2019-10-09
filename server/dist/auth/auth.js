'use strict';

var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  try {
    var token = req.headers.authorization.split(' ')[1];
    var decoded = jwt.verify(token, 'This_is_jwt_secret');
    req.userData = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({
      message: 'Auth failed'
    });
  }
};