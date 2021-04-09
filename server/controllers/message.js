const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const asyncHandler = require('express-async-handler');

// @route POST /messages
// @desc Send a new message
// @access Private
exports.sendMessage = asyncHandler(async (req, res, next) => {
  const newMessage = {
    conversation: req.body.conversationId,
    sender: req.user.id,
    body: req.body.body,
  };

  let message = await Message.create(newMessage);

  message = await message
    .populate('conversation')
    .populate('sender', '-password')
    .execPopulate();

  await Conversation.findByIdAndUpdate(req.body.conversationId, {
    mostRecentMessage: message,
    $push: { messages: message },
  });

  req.io.emit('newMessage', message);

  res.status(201).json(message);
});

// @route PUT /messages/read
// @desc Updates messages with reader
// @access Private
exports.readMessages = asyncHandler(async (req, res, next) => {
  await Message.updateMany(
    { conversation: req.body.conversationId },
    { $addToSet: { readBy: req.user.id } }
  );

  res.send('Updated messages as read');
});
