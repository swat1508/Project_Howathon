'use strict';

var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
require('../models/UserModel');
var UserModel = mongoose.model('user');
require('../models/MessageModel');
var MessageModel = mongoose.model('message');

var appController = {
  addUser: function addUser(req, res, next) {
    console.log('in controltefr---------------------', req.body);
    try {
      // if (req.body.loggedinUser) {
      var userModel = new UserModel({
        name: req.body.name,
        email: req.body.email,
        date: new Date()
      });
      userModel.save(function (error, response) {
        res.set('Content-Type', 'application/json');
        res.status(201).send(response);
      });
      // }
    } catch (error) {
      next(error);
    }
  },

  getConversationHistory: function getConversationHistory(req, res, next) {
    console.log('req.query.userId-------------------', req.params.userId);
    try {
      MessageModel.find({ createrUser: req.params.userId }).sort({ date: 'asc' }).then(function (response) {
        // if (err) {
        //   throw err;
        // } else {
        res.set('Content-Type', 'application/json');
        res.status(200).send(response);
        return res;
        // }
      });
    } catch (error) {
      next(error);
    }
  },

  createMessage: function createMessage(req, res, next) {
    try {
      var messageModel = new MessageModel({
        messageData: req.body.message,
        date: new Date()
      });
      messageModel.createrUser = req.body.userId;
      messageModel.save(function (error, response) {
        res.set('Content-Type', 'application/json');
        res.status(201).send(response);
      });
    } catch (error) {
      next(error);
    }
  },

  getUserByUserId: function getUserByUserId(req, res, next) {
    console.log('req.query.userId-------------------', req.params.userId);
    try {
      UserModel.findOne({ _id: req.params.userId }).then(function (response) {
        // if (err) {
        //   throw err;
        // } else {
        res.set('Content-Type', 'application/json');
        res.status(200).send(response);
        return res;
        // }
      });
    } catch (error) {
      next(error);
    }
  },

  login: function login(req, res, next) {
    UserModel.find({ email: req.body.email }).exec().then(function (user) {
      if (user.length < 1) {

        var userModel = new UserModel({
          name: req.body.name,
          email: req.body.email,
          date: new Date()
        });
        userModel.save(function (error, response) {
          var token = jwt.sign({ name: response.name, userId: response._id }, 'This_is_jwt_secret', { expiresIn: '1h' });
          return res.status(200).json({
            message: 'Auth successful',
            token: token
          });
        });
      } else {
        /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
        var token = jwt.sign({ name: user[0].name, userId: user[0]._id }, 'This_is_jwt_secret', { expiresIn: '1h' });
        return res.status(200).json({
          message: 'Auth successful',
          token: token
        });
      }
    }).catch(function (error) {
      res.status(401).json({
        message: 'Auth failed'
      });
      next(error);
    });
  }

};

module.exports = appController;