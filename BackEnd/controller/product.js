const Product = require('../model/Product');
const User = require('../model/User');
const { validationResult } = require('express-validator');

exports.getProducts = async (req, res) => {
  try {
    const product = await Product.findOne({
      user: req.user.id,
    }).populate('User', ['name', 'email']);
    console.log(product);

    if (!product) {
      return res
        .status(400)
        .json({ status: 'Error', msg: 'There are no products for this User' });
    }

    res.status(200).json({ status: 'OK', msg: product });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: 'Error', msg: 'Server Error' });
  }
};

exports.addProducts = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ status: 'Error', msg: errors.array() });
  }

  const { type, product_name, quantity_in_lb, price_per_lb } = req.body;
  const allItems = {
    user: req.user.id,
    Product: [
      {
        type,
        product_name,
        quantity_in_lb,
        price_per_lb,
      },
    ],
  };
  console.log('ALLITEMS--->', allItems);

  try {
    let product = await Product.findOne({ user: req.user.id });
    if (product) {
      product.Product.push(req.body);
      await product.save();
      console.log('INSIDE IF PRODUCT-->', product);
      return res.status(200).json({ status: 'OK', msg: product });
    }
    product = new Product(allItems);
    await product.save();

    console.log('PRODUCTS----->', product);

    res.status(200).json({ status: 'OK', msg: product });
  } catch (error) {
    console.error('Error--->', error.message);
    res.status(500).json({ status: 'Error', msg: 'Server Error' });
  }
};
