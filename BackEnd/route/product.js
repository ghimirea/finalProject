const router = require('express').Router();
const productController = require('../controller/product');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

/**
 *@swagger
 * /products:
 *   get:
 *      description: Farmers are able to see the products from their farm 
 *      responses:
 *       "200":
 *         description : Farmer's products successfully shown
 *       "400":
 *         description: No products for thr farmer exists
 *       "500":
 *         description: Server Error
 
 */
router.get('/products', auth, productController.getProducts);

/**
 *@swagger
 * /product/:id:
 *   get:
 *      description: Farmers are able to see the particular product from their farm 
 *      responses:
 *       "200":
 *         description : Farmer's product successfully shown
 *       "401":
 *         description: User not authorized! Farmers can only see the product from their farm
 *       "500":
 *         description: Server Error
 
 */
router.get('/product/:id', auth, productController.getProduct);

/**
 *@swagger
 * /products/:id:
 *   get:
 *      description: Customers can select a particular farmer and see their products
 *      responses:
 *       "200":
 *         description : Selected farmer product successfully shown
 *       "400":
 *         description: No products for thr farmer exists
 *       "500":
 *         description: Server Error
 
 */
router.get('/products/:id', auth, productController.getFarmerProduct);

/**
 *@swagger
 * /products/add:
 *   post:
 *      description: Farmers are able to add products to the farm
 *      responses:
 *       "200":
 *         description : Product successfully added
 *       "500":
 *         description: Server Error
 
 */
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

/**
 *@swagger
 * /products/:id:
 *   delete:
 *      description: Farmers are able to delete the particular product from their farm 
 *      responses:
 *       "200":
 *         description : Farmer products successfully deleted
 *       "401":
 *         description: User not authorized! Farmers can delete only the product from their farm
 *       "500":
 *         description: Server Error
 
 */
router.delete('/products/:id', auth, productController.deleteProduct);

/**
 *@swagger
 * /products/:id:
 *   patch:
 *      description: Farmers are able to update the products from their farm 
 *      responses:
 *       "200":
 *         description : Farmer products successfully updated
 *       "401":
 *         description: User not authorized! Farmers can update only the product from their farm
 *       "500":
 *         description: Server Error
 
 */
router.patch('/products/:id', auth, productController.updateProduct);

module.exports = router;
