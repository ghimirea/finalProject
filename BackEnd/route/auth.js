const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const authController = require('../controller/auth');
const { check } = require('express-validator');

/**
 *@swagger
 * /auth:
 *   get:
 *      description: Get User. 
 *      responses:
 *       "200":
 *         description : Get the logged in User.
 *       "500":
 *         description: Server Error
 
 */
router.get('/auth', auth, authController.getUser);

 router.get('/auth/log', auth, role, authController.getLogs);

/**
 *@swagger
 * /auth:
 *   post:
 *      description: Login User. 
 *      responses:
 *       "200":
 *         description : User will be logged in
 *       "400":
 *         description: Invalid Credentials
 *       "500":
 *         description: Server Error
 
 */
router.post(
  '/auth',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  authController.loginUser
);

/**
 *@swagger
 * /auth:
 *   patch:
 *      description: Admin can reset the password and send the customer an email with the default password. 
 *      responses:
 *       "200":
 *         description : Password has been reset and email has been sent.
 *       "500":
 *         description: Server Error
 
 */
router.patch('/auth/:id', auth, role, authController.changePassword);

module.exports = router;
