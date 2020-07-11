const router = require('express').Router();
const orderController = require('../controller/order');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const { check } = require('express-validator');

router.post('/cart', [auth, role], orderController.postToCart);

router.patch('/cart/:id', auth, orderController.updateCart);

router.delete('/cart/:id', auth, orderController.deleteProdCart)

module.exports = router;
