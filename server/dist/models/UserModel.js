'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Create Schema
var UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('user', UserSchema); //myUserModel will be name of collection in DB