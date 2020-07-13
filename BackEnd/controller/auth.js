const Farmer = require('../model/User');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

exports.getUser = async (req, res) => {
  try {
    const user = await Farmer.findById(req.user.id).select('-password');
    res.status(200).json({ status: 'OK', msg: user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: 'Error', msg: 'Server Error' });
  }
};



exports.loginUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(500).json({ status: 'Error', msg: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await Farmer.findOne({ email });

    if (!user) {
      res.status(400).json({ status: 'Error', msg: 'Invalid Credentials' });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      res.status(400).json({ status: 'Error', msg: 'Invalid Credentials' });
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
