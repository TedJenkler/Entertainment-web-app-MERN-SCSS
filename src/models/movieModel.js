const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  posterPath: {
    type: String,
    required: true,
    trim: true,
  },
  topRated: {
    type: Boolean,
    default: false
  },
  nowPlaying: {
    type: Boolean,
    default: false
  },
  popular: {
    type: Boolean,
    default: false
  },
  upcoming: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;