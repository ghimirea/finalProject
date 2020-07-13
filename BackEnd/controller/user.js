const User = require('../model/User');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'Error', msg: errors.array() });
  }

  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ status: 'Error', msg: 'User already Exists' });
    }

    user = new User({
      name,
      email,
      password,
      role,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
        role: user.role,
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

// //! Admin can see all users
// exports.getAllUsers = async (req, res) => {
//   try {
//     const allUsers = await User.find({_id:req.params.id});
//     res.status(200).json({ status: 'OK', msg: allUsers });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ status: 'Error', msg: 'Server Error' });
//   }
// };

// //! Admin can change the Active status
// exports.changeActive = async (req, res) => {
//   try {
//     const user = await User.findOne()
      
//   } catch (error) {
//       console.error(error.message);
      
      
//   }
// }
