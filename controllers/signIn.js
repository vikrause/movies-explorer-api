const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_SECRET, NODE_ENV } = process.env;
const { DEV_SECRET_KEY, ENV_PRODUCTION } = require('../utils/config');

const signIn = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === ENV_PRODUCTION ? JWT_SECRET : DEV_SECRET_KEY,
        { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true
      });
      res.send({ message: 'Вход выполнен' });
    })
    .catch(next);
};

module.exports = signIn;