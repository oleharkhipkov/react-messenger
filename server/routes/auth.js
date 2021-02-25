const express = require('express');
const router = express.Router();
const { validateRegister, validateLogin } = require('../validate');
const { registerUser, loginUser } = require('../controllers/auth');

router.route('/register').post(validateRegister, registerUser);

router.route('/login').post(validateLogin, loginUser);

module.exports = router;
