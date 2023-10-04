const User = require('../models/user');
const BadRequest = require('../errors/BadRequest')
const NotFoundError = require('../errors/NotFoundError')
const ConflictError = require('../errors/ConflictError')
const {
  ValidationError,
  DocumentNotFoundError,
} = require('mongoose').Error;

const getUserInfo = (req, res, next) => {
  const {email, name} = req.body;

  User.findOne(email, name)
    .then((user) => res.send(user))
    .catch((err) => {
      if(err instanceof DocumentNotFoundError) {
        next(new NotFoundError('Не найдено'))
      } else {
        next(err);
      }
    })
}

const updateUserInfo = (req, res, next) => {
  const {email, name} = req.body;

  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof DocumentNotFoundError) {
        next(new NotFoundError('Не найдено'));
      } else if (err instanceof ValidationError) {
        next(new BadRequest('Некорректные данные'));
      }  else if (err.code === 11000) {
        next(new ConflictError('Доступ отсутствует'));
      } else {
        next(err);
      }
    })
}

module.exports = {
  getUserInfo,
  updateUserInfo
}
