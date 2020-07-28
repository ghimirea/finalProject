const router = require('express').Router();
const orderController = require('../controller/order');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const { check } = require('express-validator');

/**
 *@swagger
 * /order:
 *   get:
 *      description: Order is created once the customer checks out the items and an email is sent to the farmer and the customer saying the order is in pending status and another email will be sent once the orde status changes. 
 *      responses:
 *       "200":
 *         description : Order created successfully and email is sent.
 *       "401":
 *         description: Unauthorized Access! Customer needs to be logged in to make an order
 *       "500":
 *         description: Server Error
 
 */
router.get('/order', auth, orderController.makeOrder);

/**
 *@swagger
 * /orders:
 *   get:
 *      description: Farmers can see all the order for their farm 
 *      responses:
 *       "200":
 *         description : Farmer's order are shown successfully.
 *       "500":
 *         description: Server Error
 
 */
router.get('/orders', auth, orderController.getOrders);

/**
 *@swagger
 * /orders/customer:
 *   get:
 *      description: Customers can see their order history  
 *      responses:
 *       "200":
 *         description : Order history successfully shown.
 *       "500":
 *         description: Server Error
 
 */
router.get('/orders/customer', auth, orderController.getPatOrder);

/**
 *@swagger
 * /allorders:
 *   get:
 *      description: Admin can see all the orders 
 *      responses:
 *       "200":
 *         description : All the orders along with their status is shown successfully.
 *       "500":
 *         description: Server Error
 
 */
router.get('/allorders', auth, role, orderController.getAllOrders);

/**
 *@swagger
 * /orders/:id:
 *   get:
 *      description: Farmers can select the particular order from the list of all their orders 
 *      responses:
 *       "200":
 *         description : Farmers particular order successfully shown.
 *       "401":
 *         description: Unauthorized Access! Farmer can only see orders from their farm
 *       "500":
 *         description: Server Error
 
 */
router.get('/orders/:id', auth, orderController.getOrder);

/**
 *@swagger
 * /orders/"id":
 *   patch:
 *      description: Farmer can change the status of the order from pending to ready and from ready to completed and an email is sent saying the status of the order. 
 *      responses:
 *       "200":
 *         description : Order created successfully and email is sent.
 *       "401":
 *         description: Unauthorized Access! Farmer can change the status of only their order
 *       "500":
 *         description: Server Error
 
 */
router.patch('/orders/:id', auth, orderController.changeStatus);

module.exports = router;
