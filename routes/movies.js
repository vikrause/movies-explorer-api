const router = require('express').Router();

const {
  getMoviesByOwner,
  createMovies,
  deleteMovie
} = require('../controllers/movies')

const {
  createMovieValidator,
  deleteMovieValidator
} = require('../middlewares/celebrateValidator')

router.get('/', getMoviesByOwner);
router.post('/', createMovieValidator, createMovies);
router.delete('/:movieId', deleteMovieValidator, deleteMovie);

module.exports = router;
