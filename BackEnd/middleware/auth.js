const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({
      status: 'Error',
      msg: 'No Token Detected, Authorization Denied',
    });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    console.log('DECODED--->', decoded);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ status: 'Error', msg: 'Token is not valid' });
  }
};
