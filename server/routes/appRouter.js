const express = require('express');

const appRouter = express.Router();
const appController = require('../controller/appController');

appRouter.route('/user')
  .post(appController.addUser);

appRouter.route('/history')
  .get(appController.getConversationHistory);

module.exports = appRouter;