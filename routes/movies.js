const router = require('express').Router();

const {
  getMoviesByOwner,
  createMovies,
  deleteMovie
} = require('../controllers/movies')

router.get('/', getMoviesByOwner);
router.post('/', createMovies);
router.delete('/:movieId', deleteMovie)