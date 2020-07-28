const router = require('express').Router();
const userController = require('../controller/user');
const role = require('../middleware/role');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

/**
 *@swagger
 * /users:
 *   post:
 *      description: Farmer and Customer can register themselves. 
 *      responses:
 *       "201":
 *         description : User successfully registered
 *       "400":
 *         description: Client error. Either User already exists in the system or the required part is not filled in registration 
 *       "500":
 *         description: Server Error
 
 */
router.post(
  '/users',
  [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Valid Email is required').isEmail(),
    check(
      'password',
      'Password is required to be atleast 6 character'
    ).isLength({ min: 6 }),
  ],
  userController.registerUser
);

/**
 *@swagger
 * /users:
 *   get:
 *      description: Admin can see all the users. Farmers and Customers Both 
 *      responses:
 *       "200":
 *         description : All Users are successfully shown
 *       "500":
 *         description: Server Error
 
 */
router.get('/users', auth, role, userController.getAllUsers);

/**
 *@swagger
 * /users/farmers:
 *   get:
 *      description: Customers can see all farmers. 
 *      responses:
 *       "200":
 *         description : All Farmers successfully shown
 *       "500":
 *         description: Server Error
 
 */
router.get('/users/farmers', auth, userController.getAllFarmers);

/**
 *@swagger
 * /users/up:
 *   patch:
 *      description: Customers can like a farmer 
 *      responses:
 *       "200":
 *         description : Farmer liked successfully
 *       "500":
 *         description: Server Error
 
 */
router.patch('/users/up', auth, userController.postLike);

/**
 *@swagger
 * /users/down:
 *   patch:
 *      description: Customers can dislike a farmer 
 *      responses:
 *       "200":
 *         description : Farmer disliked successfully
 *       "500":
 *         description: Server Error
 
 */
router.patch('/users/down', auth, userController.postDisLike);

/**
 *@swagger
 * /users/comments:
 *   post:
 *      description: Customers can comment on the farmer 
 *      responses:
 *       "200":
 *         description : Comment successfully posted
 *       "500":
 *         description: Server Error
 
 */
router.post('/users/comments', auth, userController.postComment);

/**
 *@swagger
 * /users/:id:
 *   patch:
 *      description: Admin can change the active status of the user, both farmers and customers 
 *      responses:
 *       "200":
 *         description : Active status changed successfully
 *       "500":
 *         description: Server Error
 
 */
router.patch('/users/:id', auth, role, userController.changeActive);

module.exports = router;
