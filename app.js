var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var visitRouter = require('./routes/visit');
var paymentRouter = require('./routes/stripe');
var orderRouter = require('./routes/order');

var app = express();
var uniqid = require('uniqid');

app.locals.userRefForm = function(){
  return `${uniqid.time('user-')}`;
}

app.locals.visitRefForm = function(country, zip, nb){
  return `${country}${zip}-${nb}`;
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'reactapp/build')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/visit', visitRouter);
app.use('/checkout', paymentRouter);
app.use('/order', orderRouter);

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
