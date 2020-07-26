const router = require('express').Router();
const orderController = require('../controller/order');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const { check } = require('express-validator');

router.get('/order', auth, orderController.makeOrder);
router.get('/orders', auth, orderController.getOrders);
router.get('/orders/customer', auth, orderController.getPatOrder)
router.get('/allorders', auth, role, orderController.getAllOrders);
router.get('/orders/:id', auth, orderController.getOrder);

router.patch('/orders/:id', auth, orderController.changeStatus);

module.exports = router;
