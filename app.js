const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const mongo = require('mongodb');
const mongoose = require('mongoose');
// connect to the db
mongoose.connect('mongodb://admin:elearnAdmin2018@ds245234.mlab.com:45234/elearn')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

const db = mongoose.connection;
async = require('async')

// Import the routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const classesRouter = require('./routes/classes');
const studentsRouter = require('./routes/students');
const instructorRouter = require('./routes/instructors')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Express Session
app.use(session({
  secret: 'IDKDF-9DF989-89DF89D',
  saveUninitialized: false,
  resave: false
  }));
  // Passport
app.use(passport.initialize());
app.use(passport.session());



// Express Validator
// app.use(expressValidator({
//   errorFormatter: function(param, msg, value) {
//       var namespace = param.split('.')
//       , root    = namespace.shift()
//       , formParam = root;

//     while(namespace.length) {
//       formParam += '[' + namespace.shift() + ']';
//     }
//     return {
//       param : formParam,
//       msg   : msg,
//       value : value
//     };
//   }
// }));

const student1 = {
  "_id" : "5c21269c3baa6f171c071d19",
  "email" : "another@gmail.com",
  "username" : "solathecoder",
  "password" : "$2a$10$AvjP7W6K6Xo6MMb.x/bH.OMniNxKCyJHs30huM0HWejLv.LZaFXwm",
  "type" : "student",
  "__v" : 0
}
const instrutor = {
  "_id" : "5c2417c0b1206813386db5b6",
  "email" : "another@gmail.com",
  "username" : "Admin",
  "password" : "$2a$10$HRvyhJ7dx4NVWQNsgKmJOOsaMSDuqKQGeAqb3qId0zzYVSoMAHUQ6",
  "type" : "instructor",
  "__v" : 0
}

// Connect Flash 
app.use(flash());
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');

  res.locals.user = req.user = student1 || null;
  if(req.user){
    res.locals.type = student1.type;
  }
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/classes', classesRouter);
app.use('/students', studentsRouter);
app.use('/instructors', instructorRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
