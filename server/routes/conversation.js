const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  getConversations,
  createConversation,
  getConversation,
} = require('../controllers/conversation');

router.route('/').get(protect, getConversations);

router.route('/:id').get(protect, getConversation);

router.route('/').post(protect, createConversation);

module.exports = router;
