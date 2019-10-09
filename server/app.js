const express = require('express');
const exphbs = require('express-handlebars');  //exphbs - expresshandlebars
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override'); //need for PUT/Edit request
import {Recast} from './recastOps'
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = YAML.load('./swagger.yaml');

const http = require('http').createServer(app);
const io = require('socket.io')(http);
const appRouter = require('./routes/appRouter');

const {
  databasePort,
  serverPort,
  frontendHost
} = require('./config/config');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

// CORS issue, allowed methods
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', frontendHost);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    res.status(200).json({});
  }
  next();
});

app.post('/triggerRecastOps', (req, res) => {
  const recastApi = new Recast()
  recastApi.getAndCallProcessIntent(req.body)
})

app.use('/api', appRouter);

//Database Config
const db = require('./config/database');
const port =  databasePort;

mongoose.connect(db.mongoURI, {useNewUrlParser: true }).then(() => {
  console.log('Mongo DB is Connected ...');
  app.listen(port , () => {
    console.log(`Server started on port ${port} `);
  });
}).catch(err => console.log(err));
      