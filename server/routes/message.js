const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { getMessages, sendMessage } = require('../controllers/message');

router.route('/').get(protect, getMessages);

router.route('/').post(protect, sendMessage);

module.exports = router;
