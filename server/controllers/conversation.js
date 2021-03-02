const Conversation = require('../models/Conversation');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// @route GET /conversations
// @desc Get conversations for logged in user
// @access Private
exports.getConversations = asyncHandler(async (req, res, next) => {
  const conversations = await Conversation.find({ users: req.user.id })
    .populate('users mostRecentMessage')
    .sort({ updatedAt: -1 });

  if (!conversations) {
    res.status(404);
    throw new Error(`No conversations found for user ${req.user.id}`);
  }

  res.status(200).json(conversation);
});

// @route POST /conversations
// @desc Create new conversation
// @access Private
exports.createConversation = asyncHandler(async (req, res, next) => {
  if (!req.body.user) {
    res.status(400);
    throw new Error('User needed to create conversation');
  }

  const loggedInUser = req.user.id;
  const recipientUser = req.body.user;

  let conversation = await Conversation.create({
    users: [loggedInUser, recipientUser],
  });
  conversation = await conversation.populate('users').execPopulate();

  res.status(201).json(conversation);
});
