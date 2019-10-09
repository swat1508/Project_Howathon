const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
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
    console.log('req.query.userId-------------------', req.params.userId);
    try {
      MessageModel.find({ createrUser: req.params.userId }).sort({date: 'asc'}).then((response) => {
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

  createMessage: (req, res, next) => {
    try {
        const messageModel = new MessageModel({
          messageData: req.body.message,
          date: new Date()
        });
        messageModel.createrUser = (req.body.userId);
        messageModel.save((error, response) => {
            res.set('Content-Type', 'application/json');
            res.status(201).send(response);
        });
    } catch (error) {
      next(error);
    }
  },

  getUserByUserId: (req, res, next) => {
    console.log('req.query.userId-------------------', req.params.userId);
    try {
      UserModel.findOne({ _id: req.params.userId }).then((response) => {
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

  login: (req, res, next) => {
    UserModel.find({ email: req.body.email })
      .exec()
      .then((user) => {
        if (user.length < 1) {
          
          const userModel = new UserModel({
            name: req.body.name,
            email: req.body.email,
            date: new Date(),
          });
          userModel.save((error, response) => {
            const token = jwt.sign({ name: response.name, userId: response._id }, 'This_is_jwt_secret', { expiresIn: '1h' });
            return res.status(200).json({
              message: 'Auth successful',
              token,
            });
          })
        } else {
          /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
          const token = jwt.sign({ name: user[0].name, userId: user[0]._id }, 'This_is_jwt_secret', { expiresIn: '1h' });
          return res.status(200).json({
            message: 'Auth successful',
            token,
          });
        }
      })
      .catch((error) => {
        res.status(401).json({
          message: 'Auth failed',
        });
        next(error);
      });
  }

}

module.exports = appController;