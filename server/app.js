const express = require('express');
const exphbs = require('express-handlebars');  //exphbs - expresshandlebars
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override'); //need for PUT/Edit request

const http = require('http').createServer(app);
const io = require('socket.io')(http);
require('./models/UserModel');
const user_model= mongoose.model('user');

const {
  databasePort,
  serverPort
} = require('./config/config');

io.on('connection', function(socket){
  console.log('A user connected');
  socket.emit('FromAPI', 'Hello New User');
});

http.listen(serverPort, function(){
  console.log('listening on *: ', serverPort);
});

//Map Global Promise - get rid of warning
mongoose.Promise = global.Promise;

//Handlebars Middleware
app.engine('handlebars', exphbs({
defaultLayout : 'main'
}));
app.set('view engine' , 'handlebars');

//Body Parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Method-Override Middleware
app.use(methodOverride('_method'));

app.get('/', (req,res) => {    
    res.send('Home page');
});

app.get('/persistUserConvo', (req, res) => {
  const newUser =  {
              name : 'asdf',
              email: 'asdf@asfd.com',
              password :  'asdfasdf'
          } 
  new user_model(newUser).save()
})
app.get('/health', (req,res) => {    
  res.send('Server helth is fine!!!');
});

//Database Config
const db = require('./config/database');
const port =  databasePort;

mongoose.connect(db.mongoURI, {useNewUrlParser: true }).then(() => {
  console.log('Mongo DB is Connected ...');
  app.listen(port , () => {
    console.log(`Server started on port ${port} `);
  });
}).catch(err => console.log(err));
      