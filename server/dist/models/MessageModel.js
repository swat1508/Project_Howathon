'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Create Schema
var MessageSchema = new Schema({
    messageData: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    createrUser: { type: Schema.Types.ObjectId, ref: 'user' }
});

mongoose.model('message', MessageSchema);