const router = require('express').Router();
const userController = require('../controller/user');
const role = require('../middleware/role');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

router.post(
  '/users',
  [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Valid Email is required').isEmail(),
    check(
      'password',
      'Password is required to be atleast 6 character'
    ).isLength({ min: 6 }),
  ],
  userController.registerUser
);

router.get('/users', auth, role, userController.getAllUsers);
router.patch('/users/:id', auth, role, userController.changeActive);

module.exports = router;
