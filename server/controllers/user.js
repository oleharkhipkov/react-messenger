const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @route GET /users
// @desc Search for users
// @access Private
exports.searchUsers = asyncHandler(async (req, res, next) => {
  let users;
  if (req.body.searchString) {
    users = await User.find({
      username: { $regex: req.body.searchString, $options: 'i' },
    });
  }

  if (!users) {
    res.status(404);
    throw new Error('No users found in search');
  }

  res.status(200).json(users);
});
