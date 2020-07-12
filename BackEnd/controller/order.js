const Product = require('../model/Product');
const User = require('../model/User');
const Order = require('../model/Order');
const nodemailer = require('nodemailer');
const config = require('config');

exports.getOrder = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    console.log(user);
    let farmer_id = user.cart.items[0].farmer_id;
    console.log('Farmer ID-->', farmer_id);

    if (user._id.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ status: 'Error', msg: 'User is not Authorized' });
    }

    // const orderItems = {
    //   user: req.user.id,
    //   Order: [
    //     {
    //       products: user.cart.items,
    //       totalPrice: user.cart.totalPrice[user.cart.totalPrice.length - 1],
    //       status: 'Pending',
    //     },
    //   ],
    // };

    // console.log('User Order', user.cart.items);
    // console.log(
    //   'User totalPrice',
    //   user.cart.totalPrice[user.cart.totalPrice.length - 1]
    // );

    let order = await Order.findOne({ user: req.user.id });
    // console.log('Order-->', order);
    // if (order) {
    //   order.Order.push({
    //     products: user.cart.items,
    //     totalPrice: user.cart.totalPrice[user.cart.totalPrice.length - 1],
    //     status: 'Pending',
    //   });
    //   return res
    //     .status(200)
    //     .json({ status: 'OK', msg: 'Here is the Order', order });
    // }

    order = new Order({
      user: req.user.id,
      Order: [
        {
          products: user.cart.items,
          totalPrice: user.cart.totalPrice[user.cart.totalPrice.length - 1],
          status: 'Pending',
        },
      ],
    });

    await order.save();

    user.cart.items = new Array();
    user.cart.totalPrice = new Array();
    user.save();

    // console.log('User Cart-->', user.cart);

    //! nodemailer Email Sent

    let farmer = await User.findOne({ _id: farmer_id });
    console.log('Farmer-->', farmer);

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.get('Email'),
        pass: config.get('Password'),
      },
    });

    let mailOptions = {
      from: 'playnetwork.qa@gmail.com',
      to: user.email,
      cc: farmer.email,
      subject: 'Confirmation of your order',
      text:
        'Your order has been placed and is currently pending. Once it is ready another email will be sent.',
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log('Email could not be sent', err.message);
      } else {
        console.log('Email was succesfully sent');
      }
    });

    res.status(200).json({ status: 'OK', msg: 'Here is the Order', order });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: 'Error', msg: 'Server Error' });
  }
};

exports.changeStatus = async (req, res) => {
  try {
    const farmer = await User.findOne({ _id: req.user.id });
    //console.log('Farmer--->', farmer);

    const order = await Order.find({ _id: req.params.id });
    //console.log('Order--->', order[0]);

    const customer = await User.find({ _id: order[0].user });
    //console.log('Customer--->', customer[0].email);

    let farmer_order = order[0].Order[0];
    //console.log('farmer product--->', farmer_order);

    //console.log('Order Products--->', farmer_order.products[0].farmer_id);

    if (req.user.id != farmer_order.products[0].farmer_id) {
      res.status(400).json({ status: 'Error', msg: 'User not authorized' });
    }
    console.log('Order Status--->', farmer_order.status);

    if (farmer_order.status === 'Pending') {
      farmer_order.status = 'Ready';
      console.log('Status in Pending-->', order[0]);
      await order[0].save();

      //! Nodemailer to send Product Ready email

      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.get('Email'),
          pass: config.get('Password'),
        },
      });

      let mailOptions = {
        from: 'playnetwork.qa@gmail.com',
        to: customer[0].email,
        cc: farmer.email,
        subject: 'Confirmation of your order',
        text:
          'Your order is ready for pickup. Please come and pick it up so that you can get a fresh product',
      };

      transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
          console.log('Email could not be sent', err.message);
        } else {
          console.log('Email was succesfully sent');
        }
      });
    } else if (farmer_order.status === 'Ready') {
      farmer_order.status = 'Completed';
      console.log('Status inside Ready-->', order[0]);
      await order[0].save();

      //! Nodemailer to send Product Ready email

      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.get('Email'),
          pass: config.get('Password'),
        },
      });

      let mailOptions = {
        from: 'playnetwork.qa@gmail.com',
        to: customer[0].email,
        cc: farmer.email,
        subject: 'Confirmation of your order',
        text:
          'Thank you for choosing our Farm. Please do leave a feedback and the rating. Hope to serve you again',
      };

      transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
          console.log('Email could not be sent', err.message);
        } else {
          console.log('Email was succesfully sent');
        }
      });
    }

    res
      .status(200)
      .json({ status: 'OK', msg: 'Status has been changed', order });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: 'Error', msg: 'Server Error' });
  }
};
