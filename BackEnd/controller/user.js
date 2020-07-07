const Farmer = require('../model/Farmer');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

exports.getUsers = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'Error', data: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    let user = await Farmer.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ status: 'Error', data: 'User already Exists' });
    }

    user = new Farmer({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

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
        res.status(200).json({ status: 'OK', data: token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: 'Error', data: 'Server Error' });
  }
};
