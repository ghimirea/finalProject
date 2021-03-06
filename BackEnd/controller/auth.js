const User = require('../model/User');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const nodemailer = require('nodemailer');
var fs = require('fs');
const { nextTick } = require('process');

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({ status: 'OK', msg: user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: 'Error', msg: 'Server Error' });
  }
};

exports.loginUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(500).json({ status: 'Error', msg: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ status: 'Error', msg: 'Invalid Credentials' });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res
        .status(400)
        .json({ status: 'Error', msg: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ status: 'OK', msg: token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: 'Error', msg: 'Server Error' });
  }
};

//! Admin can reset the password
exports.changePassword = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    const cur_user = await User.updateOne(
      { _id: req.params.id },
      {
        $set: { password: req.body.password },
      },
      { new: true }
    );
    await user.save();

    //! Send email with the password
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
      subject: 'Password Change Confirmation',
      text: `Your password was changed as per your request. Your current password is ${user.password}. Please change is as soon as possible to the password of your choice`,
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log('Email could not be sent', err.message);
      } else {
        console.log('Email was succesfully sent');
      }
    });

    res.status(200).json({ status: 'OK', msg: 'Password has Changed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: 'Error', msg: 'Server Error' });
  }
};

//! Admin can see the logs
exports.getLogs = async (req, res, next) => {
  const user = await User.findOne({ _id: req.user.id });

  let data = '';

  try {
    let readStream = fs.createReadStream('access.log', 'utf8');

    readStream
      .on('data', function (chunk) {
        data += chunk;
      })
      .on('end', function () {
        res.status(200).json({ status: 'OK', msg: data });
        next();
      });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ status: 'Error', msg: 'Server Error' });
  }
};
