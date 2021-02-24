const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    await User.findById(req.session.userId);
  } catch (err) {
    return res.status(401).send(err, 'Not Authorized');
  }
  next();
};

module.exports = protect;
