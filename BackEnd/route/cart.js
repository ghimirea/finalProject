const router = require('express').Router();
const cartController = require('../controller/cart');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const { check } = require('express-validator');

/**
 *@swagger
 * /cart:
 *   get:
 *      description: Get the Customer Cart in the mobile. 
 *      responses:
 *       "200":
 *         description : Customer can see their cart.
 *       "401":
 *         description: Unauthorized Access! Only Customer can access the cart
 *       "500":
 *         description: Server Error
 
 */
router.get('/cart', auth, cartController.getCart);

/**
 *@swagger
 * /cart:
 *   post:
 *      description: Customer can add the item to the cart. 
 *      responses:
 *       "200":
 *         description : Product added to the cart successfully.
 *       "401":
 *         description: Unauthorized Access! Only Customer can add to cart
 *       "500":
 *         description: Server Error
 
 */
router.post('/cart', auth, cartController.postToCart);

/**
 *@swagger
 * /cart/:id:
 *   patch:
 *      description: Customer can update their cart. 
 *      responses:
 *       "200":
 *         description : Cart updated successfully.
 *       "401":
 *         description: Unauthorized Access! Only logged in customer can update the cart
 *       "500":
 *         description: Server Error
 
 */
router.patch('/cart/:id', auth, cartController.updateCart);

/**
 *@swagger
 * /cart:id:
 *   delete:
 *      description: Customer can delete the item from the cart. 
 *      responses:
 *       "200":
 *         description : Product deleted from the cart successfully.
 *       "500":
 *         description: Server Error
 
 */
router.delete('/cart/:id', auth, cartController.deleteProdCart);

module.exports = router;
