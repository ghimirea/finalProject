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

      // user.cart.totalPrice = {
      //   number: 0,
      // };

      let prod_price = user.cart.totalPrice;
      console.log('TYpe--->', typeof prod_price);

      let cart_item = user.cart.items.push(req.body);
      // let cart = User.cart.populate(user.cart.totalPrice);

      await user.save();

      console.log(
        'Item in the cart-1-->',
        user.cart,
        'Item in the cart-1-->',
        cart_item
      );

      const product_price = product[0].price_per_lb;
      // for (let price in Object.values(user.cart.totalPrice)) {

      //   return price += user.cart.items.map((item) => item.quantity * product_price);
      // }
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

      //user.cart.totalPrice[0].price = total_price;

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
