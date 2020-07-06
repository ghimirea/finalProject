const router = require('express').Router();
const productController = require('../controller/product');

router.get('/products', productController.getProducts);

module.exports = router;
