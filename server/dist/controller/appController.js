'use strict';

var mongoose = require('mongoose');
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
        date: new Date(),
        createrUser: mongoose.Types.ObjectId("5d9e434ce7b2835bb3444a8b")
      });
      messageModel.save().then(function (msg) {
        console.log("data saved ====================== ", msg);
      }).catch(function (err) {
        console.log(err);
        return;
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
  }

};

module.exports = appController;