const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const asyncHandler = require('express-async-handler');

// @route GET /messages
// @desc Get all messages for a conversation
// @access Private
exports.getMessages = asyncHandler(async (req, res, next) => {
  const messages = await Message.find({
    conversation: req.body.conversationId,
  })
    .populate('sender', 'username')
    .sort({ updatedAt: 1 });

  if (!messages) {
    res.status(404);
    throw new Error(
      `No messages found with a conversation id of ${req.body.conversationId}`
    );
  }

  res.status(200).json(messages);
});

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

  res.status(201).json(message);
});
