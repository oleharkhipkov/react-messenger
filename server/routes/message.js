const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { sendMessage, readMessages } = require('../controllers/message');

router.route('/').post(protect, sendMessage);

router.route('/read').put(protect, readMessages);

module.exports = router;
