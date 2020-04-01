const express = require('express');

const appRouter = express.Router();
const appController = require('../controller/appController');

// login route
appRouter.route('/')
  .post(appController.login);

appRouter.route('/user')
  .post(appController.addUser);

appRouter.route('/message')
  .post(appController.createMessage);

appRouter.route('/history/:userId')
  .get(appController.getConversationHistory);

appRouter.route('/user/:userId')
  .get(appController.getUserByUserId);


module.exports = appRouter;