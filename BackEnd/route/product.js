const router = require('express').Router();
const productController = require('../controller/product');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

//! logged in users product list
router.get('/products', auth, productController.getProducts);
router.get('/product/:id', auth, productController.getProduct)

//! Products by Farmer ID
router.get('/products/:id', auth, productController.getFarmerProduct)

//! logged in user add product
router.post(
  '/products/add',
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

//! logged in user can delete product
router.delete('/products/:id', auth, productController.deleteProduct);

//! logged in user can update products
router.patch('/products/:id', auth, productController.updateProduct);



module.exports = router;
