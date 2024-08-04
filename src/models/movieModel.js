const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  poster_path: {
    type: String,
    required: true,
    trim: true
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
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dateUpdated: {
    type: Date,
    default: Date.now
  }
});

movieSchema.pre('save', function(next) {
  this.dateUpdated = Date.now();
  next();
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;