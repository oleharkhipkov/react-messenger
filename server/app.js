const createError = require('http-errors');
const colors = require('colors');
const express = require('express');
const connectDB = require('./db');
const { join } = require('path');
const cookieSession = require('cookie-session');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const pingRouter = require('./routes/ping');
const authRouter = require('./routes/auth');

const { json, urlencoded } = express;

connectDB();
const app = express();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(
  cookieSession({
    keys: ['gkdhcnergfl295'],
  })
);
app.use(express.static(join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/ping', pingRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
