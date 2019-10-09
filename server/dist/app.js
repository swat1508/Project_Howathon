'use strict';

var _recastOps = require('./recastOps');

var express = require('express');
var exphbs = require('express-handlebars'); //exphbs - expresshandlebars
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override'); //need for PUT/Edit request

var http = require('http').createServer(app);
var io = require('socket.io')(http);
require('./models/UserModel');
var user_model = mongoose.model('user');

var _require = require('./config/config'),
    databasePort = _require.databasePort,
    serverPort = _require.serverPort,
    frontendHost = _require.frontendHost;

io.on('connection', function (socket) {
  console.log('A user connected');
  socket.emit('FromAPI', 'Hello New User');
});

http.listen(serverPort, function () {
  console.log('listening on *: ', serverPort);
});

//Map Global Promise - get rid of warning
mongoose.Promise = global.Promise;

//Handlebars Middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Method-Override Middleware
app.use(methodOverride('_method'));

// CORS issue, allowed methods
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', frontendHost);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    res.status(200).json({});
  }
  next();
});

app.get('/health', function (req, res) {
  console.log('Server helth is fine!!!');
  res.status(200);
  res.json({ data: 'Server helth is fine!!!' });
});

app.post('/triggerRecastOps', function (req, res) {
  var recastApi = new _recastOps.Recast();
  recastApi.getAndCallProcessIntent(req.body).then(function (response) {
    res.status(200);
    res.json(response);
  });
});

app.get('/persistUserConvo', function (req, res) {
  var newUser = {
    name: 'asdf',
    email: 'asdf@asfd.com',
    password: 'asdfasdf'
  };
  new user_model(newUser).save();
});
app.get('/health', function (req, res) {
  res.status(200);
  res.send({ data: 'Server helth is fine!!!' });
});

app.get('/', function (req, res) {
  console.log('at root---------');
  res.send('Home page');
});

//Database Config
var db = require('./config/database');
var port = databasePort;

mongoose.connect(db.mongoURI, { useNewUrlParser: true }).then(function () {
  console.log('Mongo DB is Connected ...');
  app.listen(port, function () {
    console.log('Server started on port ' + port + ' ');
  });
}).catch(function (err) {
  return console.log(err);
});