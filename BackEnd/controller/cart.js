const Product = require('../model/Product');
const User = require('../model/User');

//! Get Cart
exports.getCart = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.user.id });

    if (user.role !== 'Customer') {
      res.status(400).json({ status: 'Error', msg: 'User not authorized' });
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
    console.log('User-->', user);
    if (user.role === 'Customer') {
      //? find the farmer and the products
      let product = await Product.findOne({ user: req.body.farmer_id });
      console.log('product.Product', product);

      //? find the particular product
      farmer_product = product.Product.filter((product) => {
        return product._id.toString() === req.body.prod_id;
      });
      console.log('Product Matched--->', farmer_product);

      let prod_price = user.cart.totalPrice;
      console.log('Total Price--->', prod_price);

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
      console.log('Add To Cart--->', req.body);

      console.log(
        'FARMER QUANTITY AND CUSTOMER QTY--->',
        farmer_product[0].quantity_in_lb,
        req.body.quantity
      );
      farmer_product[0].quantity_in_lb -= req.body.quantity;

      await user.save();
      await product.save();

      const product_price = farmer_product[0].price_per_lb;
      user.cart.items[0].price_per_lb = product_price;

      console.log('Total Price Before--->', user.cart.totalPrice);
      let price_prod = user.cart.items.map(
        (item) => item.quantity * product_price
      );
      let total_price = 0;
      price_prod.forEach((element) => {
        total_price += element;
      });

      console.log('Map Price', price_prod);
      console.log('totalPrice', total_price);

      user.cart.totalPrice.push({ price: total_price });

      console.log(
        'Item in the cart-2-->',
        user.cart,
        'Item in the cart-2-->',
        cart_item
      );
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
    console.log(user);

    if (user._id.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ status: 'Error', msg: 'User is not Authorized' });
    }

    const { quantity, price_per_lb } = req.body;

    // let fullPrice = user.cart.totalPrice.length - 1
    // let updatedPrice = user.cart.totalPrice[user.cart.totalPrice.length - 1].price -  (quantity * price_per_lb);
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
      console.log('Updated--->', update);
    }

    await user.save();

    console.log(
      'Cart-->',
      user.cart.totalPrice[user.cart.totalPrice.length - 1].price
    );

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
    console.log(user);

    await user.cart.items.pull({ _id: req.params.id });

    //! Price change should be reflected on the total price and the inventory for the farmer should be updated(Fix it)

    await user.save();

    res.status(200).json({ status: 'OK', msg: 'Product has been deleted' });
  } catch (error) {
    console.log(error);
    res.status(200).json({ status: 'Error', msg: 'Server Error' });
  }
};
