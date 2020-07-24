const router = require('express').Router();
const cartController = require('../controller/cart');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const { check } = require('express-validator');

router.post('/cart', auth, cartController.postToCart);

router.patch('/cart/:id',auth, cartController.updateCart);

router.delete('/cart/:id',auth, cartController.deleteProdCart);

module.exports = router;
