const colors = require('colors');
const express = require('express');
const { notFound, errorHandler } = require('./middleware/error');
const connectDB = require('./db');
const { join } = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const authRouter = require('./routes/auth');
const conversationRouter = require('./routes/conversation');
const messageRouter = require('./routes/message');
const userRouter = require('./routes/user');

const { json, urlencoded } = express;

connectDB();
const app = express();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/conversations', conversationRouter);
app.use('/messages', messageRouter);
app.use('/users', userRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
