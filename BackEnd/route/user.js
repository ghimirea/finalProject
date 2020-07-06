const router = require('express').Router();
const userController = require('../controller/user');

router.get('/users', userController.getUsers);

module.exports = router;