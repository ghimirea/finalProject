const Product = require('../model/Product');
const User = require('../model/User');

//! Get Cart
exports.getCart = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.user.id });

    if (user.role !== 'Customer') {
      res.status(401).json({ status: 'Error', msg: 'User not authorized' });
    }
    let cart = user.cart;
    res.status(200).json({ status: 'OK', msg: cart });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: 'Error', msg: 'Server Error' });
  }
};

//! Add to Cart
exports.postToCart = async (req, res) => {
  try {
    //? Find the customer
    let user = await User.findOne({ _id: req.user.id });
    if (user.role === 'Customer') {
      //? find the farmer and the products
      let product = await Product.findOne({ user: req.body.farmer_id });

      //? find the particular product
      farmer_product = product.Product.filter((product) => {
        return product._id.toString() === req.body.prod_id;
      });

      let prod_price = user.cart.totalPrice;

      const {
        farmer_id,
        prod_id,
        product_name,
        quantity,
        price_per_lb,
      } = req.body;

      //? Add to cart
      let cart_item = user.cart.items.push({
        farmer_id,
        prod_id,
        product_name,
        quantity,
        price_per_lb,
      });
     
      farmer_product[0].quantity_in_lb -= req.body.quantity;

      await user.save();
      await product.save();

      const product_price = farmer_product[0].price_per_lb;
      user.cart.items[0].price_per_lb = product_price;

      let price_prod = user.cart.items.map(
        (item) => item.quantity * product_price
      );
      let total_price = 0;
      price_prod.forEach((element) => {
        total_price += element;
      });

     

      user.cart.totalPrice.push({ price: total_price });

      
      await user.save();

      res.status(200).json({ status: 'OK', msg: farmer_product });

    } else {
      res.status(401).json({ status: 'Error', msg: 'Not Authorized' });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: 'Error', msg: 'Server Error' });
  }
};

//! Update Cart
exports.updateCart = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.user.id }).populate('cart');
   

    if (user._id.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ status: 'Error', msg: 'User is not Authorized' });
    }

    const { quantity, price_per_lb } = req.body;

    
    //! Price change should be reflected on the cart (fix it)
    if (user.role === 'Customer') {
      const update = await User.updateOne(
        {
          _id: req.user.id,
          'cart.items._id': req.params.id,
        },
        {
          $set: {
            'cart.items.$': {
              quantity: req.body.quantity,
              price_per_lb: req.body.price_per_lb,
            },
          },
        },
        { new: true }
      );
      
    }

    await user.save();

    

    res.send('Cart Updated');
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'Error', msg: 'Server Error' });
  }
};

//! Delete from cart
exports.deleteProdCart = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.user.id }).populate('cart');
    

    await user.cart.items.pull({ _id: req.params.id });

    //! Price change should be reflected on the total price and the inventory for the farmer should be updated(Fix it)

    await user.save();

    res.status(200).json({ status: 'OK', msg: 'Product has been deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'Error', msg: 'Server Error' });
  }
};
