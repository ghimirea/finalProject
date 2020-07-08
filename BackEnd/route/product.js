const router = require('express').Router();
const productController = require('../controller/product');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

//! logged in users product list
router.get('/products/list', auth, productController.getProducts);

//! logged in user add product
router.post(
  '/products',
  [
    auth,
    [
      check('product_name', 'Product name is required').notEmpty(),
      check('quantity_in_lb', 'Quantity is required').isNumeric().notEmpty(),
      check('price_per_lb', 'Price is required').isNumeric().notEmpty(),
    ],
  ],
  productController.addProducts
);

//! logges in user delete product
router.delete('/products/:id', auth, productController.deleteProduct);

module.exports = router;
