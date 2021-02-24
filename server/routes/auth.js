const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { validateRegister, validateLogin } = require('../validate');

router.post('/', function (req, res, next) {
  const message = req.body.message;
  res
    .status(200)
    .send({ response: `Server is running. Message received: ${message}` });
});

router.post('/signup', validateRegister, async function (req, res, next) {
  const { username, email, password } = req.query;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).send({ response: 'User already exists' });
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    req.session.userId = user.id;

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
    }
  } catch (err) {
    res.status(500).send('Server Error');
    console.log(err);
  }
});

router.post('/login', validateLogin, async function (req, res, next) {
  const { email, password } = req.query;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    req.session.userId = user.id;

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(401).send('Invalid email or password');
  }
});

module.exports = router;
