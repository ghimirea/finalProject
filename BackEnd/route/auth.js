const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const authController = require('../controller/auth');
const { check } = require('express-validator');

//! router.get('/auth', auth, authController.getUser);
router.get('/auth', auth,  authController.getUser);

router.post(
  '/auth',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  authController.loginUser
);

router.patch('/auth/:id', auth, role, authController.changePassword)

module.exports = router;
