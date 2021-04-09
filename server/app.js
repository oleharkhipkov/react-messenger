const colors = require('colors');
const http = require('http');
const path = require('path');
const express = require('express');
const socketio = require('socket.io');
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
const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: '*',
  },
});

const onlineUsers = {};

io.on('connection', (socket) => {
  socket.on('user-online', (user) => {
    onlineUsers[socket.id] = user.id;
    io.emit('users-online', onlineUsers);
  });

  socket.on('join room', (room) => socket.join(room));
  socket.on('leave room', (room) => socket.leave(room));
  socket.on('typing', (room) => socket.to(room).emit('typing'));
  socket.on('not typing', (room) => socket.to(room).emit('not typing'));

  socket.on('disconnect', () => {
    delete onlineUsers[socket.id];
    io.emit('users-online', onlineUsers);
  });
});

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/auth', authRouter);
app.use('/conversations', conversationRouter);
app.use('/messages', messageRouter);
app.use('/users', userRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname), 'client', 'build', 'index.html')
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running');
  });
}

app.use(notFound);
app.use(errorHandler);

module.exports = { app, server };
