const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { searchUsers } = require('../controllers/user');

router.route('/').post(protect, searchUsers);

module.exports = router;
