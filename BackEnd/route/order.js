const router = require('express').Router();
const orderController = require('../controller/order');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const { check } = require('express-validator');

router.get('/order', auth, orderController.getOrder);

router.patch('/order/:id',auth, orderController.changeStatus)

module.exports = router;
