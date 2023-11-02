const Movie = require('../models/movie');
const {
  ValidationError,
  DocumentNotFoundError,
  CastError
} = require('mongoose').Error;
const NotFoundError = require('../errors/NotFoundError')
const ForbiddenError = require('../errors/ForbiddenError')
const BadRequest = require('../errors/BadRequest')

const getMoviesByOwner = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch((err) => {
      if(err instanceof DocumentNotFoundError) {
        next(new NotFoundError('Карточка не найдена'));
      } else {
        next(err);
      }
    })
}

const createMovies = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest('Некорректные данные'));
      } else {
        next(err);
      }
    })
}

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        return Movie.deleteOne({_id: movieId})
          .then(() => res.send(movie))
      }
      return next(new ForbiddenError('Нет доступа'));
    })
    .catch((err) => {
      if (err instanceof DocumentNotFoundError) {
        next(new NotFoundError('Не найдено'));
      } else if (err instanceof CastError) {
        next(new BadRequest('Некорректные данные'));
      } else {
        next(err);
      }
    })
}

module.exports = {
  getMoviesByOwner,
  createMovies,
  deleteMovie
}
