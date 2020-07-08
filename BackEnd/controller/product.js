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

exports.deleteProduct = async (req, res) => {
  try {
    let product = await Product.findOne({
      user: req.user.id,
    });
    console.log(req.user.id);
    console.log('Find Product by user id---->', product);
    console.log('product.Product--->', product.Product);

    // product.Product = await product.Product.findOne({ id: req.params.id });
    // console.log('Find by ID----->', product);

    if (!product) {
      return res
        .status(404)
        .json({ status: 'Error', msg: 'Product not Found' });
    }

    if (product.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ status: 'Error', msg: 'User is not Authorized' });
    }

    // let product_delete = product.Product.filter((product) => {
    //   console.log(
    //     'Product_id-->',
    //     product._id,
    //     typeof product._id.toString(),
    //     'req.params.id-->',
    //     req.params.id,
    //     typeof req.params.id
    //   );
    //   console.log(product);
    //   return product._id.toString() === req.params.id;
    // });
    // console.log('Deleted Product--->', product_delete);

    product.Product.splice(
      product.Product.filter((product) => {
        product._id.toString() == req.params.id;
      }),
      1
    );
    await product.save();

    return res
      .status(200)
      .json({ status: 'OK', msg: 'Product has been deleted' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ status: 'Error', msg: 'Server Error' });
  }
};
