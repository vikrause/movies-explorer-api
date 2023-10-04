const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');


const movieSchema = new mongoose.Schema ( {
  country: {
    type: String,
    require: true,
  },
  director: {
    type: String,
    require: true,
  },
  duration: {
    type: Number,
    require: true
  },
  year: {
    type: Number,
    require: true
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
    validate: {
      validator: (url) => isUrl(url),
      message: 'Неправильный формат ссылки',
    },
  },
  trailerLink: {
    type: String,
    require: true,
    validate: {
      validator: (url) => isUrl(url),
      message: 'Неправильный формат ссылки',
    },
  },
  thumbnail: {
    type: String,
    require: true,
    validate: {
      validator: (url) => isUrl(url),
      message: 'Неправильный формат ссылки',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    require: true
  },
  nameRU: {
    type: String,
    require: true,
  },
  nameEN: {
    type: String,
    require: true,
  }
})

module.exports = mongoose.model('movie', movieSchema);