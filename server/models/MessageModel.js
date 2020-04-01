const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const MessageSchema = new Schema({
    messageData : {
        type     : String,
        required : true
    },
    date : {
          type     : Date,
          default: Date.now()
      },
    createrUser: {type: Schema.Types.ObjectId, ref: 'user'}
});
    
mongoose.model('message', MessageSchema);
