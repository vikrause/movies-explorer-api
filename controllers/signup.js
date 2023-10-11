const bcrypt = require('bcryptjs');
const User = require('../models/user');

const { ValidationError } = require('mongoose').Error;

const BadRequest = require('../errors/BadRequest')
const ConflictError = require('../errors/ConflictError');

const signup = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      const { _id } = user;
      res.send({
        _id,
        name,
        email,
      });
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest('Некорректные данные'));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else {
        next(err);
      }
    });
};

module.exports = signup;