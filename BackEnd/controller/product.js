const Product = require('../model/Product');
const User = require('../model/User');
const { validationResult } = require('express-validator');


//! Farmer can see their products
exports.getProducts = async (req, res) => {
  try {
    const product = await Product.findOne({
      user: req.user.id,
    }).populate('User', ('name', 'email'));
    

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

//! Farmer can get particular product
exports.getProduct = async (req, res) => {
  try {
    

    const product = await Product.findOne({ user: req.user.id });
    


    if (req.user.id != product.user) {
      return res
        .status(401)
        .json({ status: 'Error', msg: 'User not authorized' });
    }

    let prod = product.Product.filter(
      (item) => item._id.toString() === req.params.id
    );

    res.status(200).json({ status: 'OK', msg: prod });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: 'Error', msg: 'Server Error' });
  }
};

//! Farmers can add Products
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
 

  try {
    let product = await Product.findOne({ user: req.user.id });
   
    if (product) {
      product.Product.push(req.body);
      await product.save();
     
      return res.status(200).json({ status: 'OK', msg: product });
    }
    product = new Product(allItems);
    await product.save();

    

    res.status(200).json({ status: 'OK', msg: product });
  } catch (error) {
    console.error( error.message);
    res.status(500).json({ status: 'Error', msg: 'Server Error' });
  }
};

//!Farmers can delete products
exports.deleteProduct = async (req, res) => {
  try {
    let product = await Product.findOne({
      user: req.user.id,
    });
    

    if (product.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ status: 'Error', msg: 'User is not Authorized' });
    }

    await product.Product.pull({ _id: req.params.id });

    await product.save();
    return res
      .status(200)
      .json({ status: 'OK', msg: 'Product has been deleted' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ status: 'Error', msg: 'Server Error' });
  }
};

//! Farmers can update Products
exports.updateProduct = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ status: 'Error', msg: errors.array() });
  }

  try {
    let product = await Product.findOne({ user: req.user.id });
    

    if (product.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ status: 'Error', msg: 'User is not Authorized' });
    }

   

    const update = await Product.updateOne(
      {
        user: req.user.id,
        'Product._id': `${req.params.id}`,
      },
      {
        $set: {
          'Product.$': {
            type: req.body.type,
            product_name: req.body.product_name,
            quantity_in_lb: req.body.quantity_in_lb,
            price_per_lb: req.body.price_per_lb,
          },
        },
      }
    );

    const updatedProduct = req.body

   

    res.status(200).json({ status: 'OK', msg: updatedProduct, update });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: 'Error', msg: 'Server Error' });
  }
};

//! Get Farmer Products by Farmer ID
exports.getFarmerProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      user: req.params.id,
    }).populate('User', ('name', 'email'));
   

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
