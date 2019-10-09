const mongoose = require('mongoose');
require('../models/UserModel');
const UserModel= mongoose.model('user');
require('../models/MessageModel');
const MessageModel= mongoose.model('message');

const appController = {
  addUser: (req, res, next) => {
    console.log('in controltefr---------------------', req.body);
    try {
      // if (req.body.loggedinUser) {
        const userModel = new UserModel({
          name: req.body.name,
          email: req.body.email,
          date: new Date(),
        });
        userModel.save((error, response) => {
            res.set('Content-Type', 'application/json');
            res.status(201).send(response);
        });
      // }
    } catch (error) {
      next(error);
    }
  },

  getConversationHistory: (req, res, next) => {
    try {
      messageModel.find({ 'message._id': req.query.userId }, (err, response) => {
        if (err) {
          throw err;
        } else {
          res.set('Content-Type', 'application/json');
          res.status(200).send(response);
          return res;
        }
      });
    } catch (error) {
      next(error);
    }
  },

  createMessage: (req, res, next) => {
    try {
        const messageModel = new MessageModel({
          messageData: req.body.message,
          date: new Date()
        });
        messageModel.createrUser.push(req.body.userId)
        messageModel.save((error, response) => {
            res.set('Content-Type', 'application/json');
            res.status(201).send(response);
        });
    } catch (error) {
      next(error);
    }
  },

}

module.exports = appController;