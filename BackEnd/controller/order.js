const Product = require('../model/Product');
const User = require('../model/User');

exports.postToCart = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.user.id });
    console.log('User-->', user);
    if (user.role === 'Customer') {
      let product = await Product.findOne({ user: req.body.farmer_id });
      console.log('product.Product', product);

      product = product.Product.filter((product) => {
        return product._id.toString() === req.body.prod_id;
      });
      console.log('Product Matched--->', product[0].price_per_lb);

      let prod_price = user.cart.totalPrice;
      console.log('TYpe--->', typeof prod_price);

      let cart_item = user.cart.items.push(req.body);

      await user.save();

      console.log(
        'Item in the cart-1-->',
        user.cart,
        'Item in the cart-1-->',
        cart_item
      );

      const product_price = product[0].price_per_lb;
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
      res
        .status(200)
        .json({ status: 'OK', msg: 'Product added to cart', product });
    } else {
      res.status(401).json({ status: 'Error', msg: 'Not Authorized' });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: 'Error', msg: 'Server Error' });
  }
};

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
