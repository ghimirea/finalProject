const User = require('../model/User');

module.exports = async function (req, res, next) {
  let user = await User.findOne({ _id: req.user.id });

  if ((user.role = 'Customer')) {
    next();
  } else {
    res.status(401).json({ status: 'Error', msg: 'Authorization Denied' });
  }
};
