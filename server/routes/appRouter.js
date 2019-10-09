const express = require('express');

const appRouter = express.Router();
const appController = require('../controller/appController');

appRouter.route('/user')
  .post(appController.addUser);

appRouter.route('/message')
  .post(appController.createMessage);

appRouter.route('/history:userId')
  .get(appController.getConversationHistory);

module.exports = appRouter;