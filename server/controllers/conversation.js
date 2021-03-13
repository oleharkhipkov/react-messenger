const Conversation = require('../models/Conversation');
const asyncHandler = require('express-async-handler');

// @route GET /conversations
// @desc Get all conversations for logged in user
// @access Private
exports.getConversations = asyncHandler(async (req, res, next) => {
  const conversations = await Conversation.find({ users: req.user.id })
    .populate('users mostRecentMessage')
    .sort({ updatedAt: -1 });

  if (!conversations) {
    res.status(404);
    throw new Error(`No conversations found for user ${req.user.id}`);
  }

  res.status(200).json(conversations);
});

// @route GET /conversations/:conversationId
// @desc Get single conversation
// @access Private
exports.getConversation = asyncHandler(async (req, res, next) => {
  const conversation = await Conversation.findById(req.params.id)
    .populate('users mostRecentMessage')
    .populate({ path: 'messages', populate: { path: 'sender' } });

  if (!conversation) {
    res.status(404);
    throw new Error(`No conversation found with id ${req.params.id}`);
  }

  res.status(200).json(conversation);
});

// @route POST /conversations
// @desc Create new conversation
// @access Private
exports.createConversation = asyncHandler(async (req, res, next) => {
  console.log('create convo', req.body);
  if (!req.body.user) {
    res.status(400);
    throw new Error('User needed to create conversation');
  }

  const loggedInUser = req.user.id;
  const recipientUser = req.body.user;

  let conversation = await Conversation.findOne({
    users: { $all: [loggedInUser, recipientUser] },
  });

  if (conversation) {
    res.status(400);
    throw new Error('A conversation already exists between these users');
  }

  conversation = await Conversation.create({
    users: [loggedInUser, recipientUser],
  });
  conversation = await conversation.populate('users').execPopulate();

  res.status(201).json(conversation);
});
