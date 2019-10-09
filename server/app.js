const express = require('express');

const exphbs = require('express-handlebars');  //exphbs - expresshandlebars

const app = express();

const mongoose = require('mongoose');


const bodyParser = require('body-parser');

const methodOverride = require('method-override'); //need for PUT/Edit request

const flash = require('connect-flash');   //needed to show messages 
const session = require('express-session'); // will be useful in maintaining session for user

const path = require('path');  //to use public folder

//Map Global Promise - get rid of warning
mongoose.Promise = global.Promise;
/*
//Connect To Mongoose
mongoose.connect('mongodb://localhost/myVidjot',{
 // useMongoClient : true
})
.then(() =>   console.log('MongoDB connected ....') )
.catch((err) => console.log('error in mongo connection is : ' , err ))
*/
//Load routes
//const myIdeaRoutes  = require('./routes/ideaRoute');  // from routes folder ==> ideaRoute.js
//const myUserRoutes  = require('./routes/userRoute');  // from routes folder ==> userRoute.js


//Handlebars Middleware
app.engine('handlebars',exphbs({
defaultLayout : 'main'
}));
app.set('view engine' , 'handlebars');

//How Middleware works - should be written before index route and about route 
/*
app.use(function(req,res,next){
  req.name = "Developer : SWAT SINHA ";
  next();
});
*/


//Body Parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Method-Override Middleware
app.use(methodOverride('_method'));
/*
//Session Middleware
app.use(session({
  secret : 'secret',
  resave :  true,
  saveUninitialized : true
}))

//Flash Middleware
app.use(flash());

//Static Folder
app.use(express.static(path.join(__dirname,'public'))); //sets public folder to be express static folder



//Global variables
app.use(function(req,res,next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


//index route
app.get('/',(req,res) => {    
  const title = 'Welcome ...';
  res.render('index' ,  {
    title : title
  });
});

//about route
app.get('/about',(req,res) => {
  // res.send('ABOUT PAGE');
     res.render('about');
});


//Use Routes
app.use('/ideas',myIdeaRoutes);  //use "myIdeaRoutes" imported above
app.use('/users',myUserRoutes);  //use "myUserRoutes" imported above
*/


app.get('/',(req,res) => {    
    res.send('Home page');
});


  



  //Database Config
const db = require('./config/database');
const port =  5000;

//connect to mongoose
/*Sec6-Lec35
mongoose.connect('mongodb://localhost/vidjot-dev',{    */
mongoose.connect(db.mongoURI,{useNewUrlParser: true }).then(() => 
{

  console.log('Mongo DB is Connected ...');
  app.listen(port , () => {
    console.log(`Server started on port ${port} `);  
    /*  back tick - used for template string/template literal and basically 
    it allow us to include variables without having to concatenate
     The above line is equivalent to 
    console.log('Server started on port ' + port);
     */
  });
})
  .catch(err => console.log(err));
      