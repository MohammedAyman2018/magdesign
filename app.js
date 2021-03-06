var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
require('dotenv')

var indexRouter = require('./routes/index');
var articlesRouter = require('./routes/articles');
var categoriesRouter = require('./routes/categories');

var app = express();

// connect to db
async function db () {
  // process.env.DB_URL
  // mongodb://localhost:27017/moblog
  await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
    useUnifiedTopology: true
  })
};
db()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(indexRouter);
app.use('/api/articles/', articlesRouter);
app.use('/api/categories/', categoriesRouter);

app.post('/auth', (req, res) => {
  if (
    req.body.name === process.env.AUTH_NAME
    && req.body.password === process.env.AUTH_PASSWORD
  ) {
    return res.status(200).json('working')
  } else {
    return res.status(400).json('INVALID')
  }
})

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
