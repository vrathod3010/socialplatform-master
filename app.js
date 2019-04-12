var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const passport = require('passport')
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const auth = require('./routes/auth');


var app = express();




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  cookie : {
    maxAge: 1000* 60 * 60 *24
}
}))

require('./config/passport')(app);


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', auth)

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


//mongodb connection with mongoose
mongoose.connect('mongodb://localhost/social_OAuth', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});





module.exports = app;
