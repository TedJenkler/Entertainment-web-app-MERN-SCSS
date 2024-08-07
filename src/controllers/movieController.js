const logger = require('../utils/logger');
const Movie = require('../models/movieModel');
const axios = require('axios');
require('dotenv').config();

const url = {
  toprated: 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
  nowplaying: 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
  popular: 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
  upcoming: 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1',
  trending: 'https://api.themoviedb.org/3/trending/movie/day?language=en-US'
};

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.API_TOKEN}`
  }
};

async function fetchMovies(url) {
  try {
    const response = await axios({ url, ...options });
    logger.info('API Response:', { data: response.data });
    return response.data;
  } catch (error) {
    if (error.response) {
      logger.error('API Error Response:', {
        status: error.response.status,
        data: error.response.data
      });
    } else if (error.request) {
      logger.error('API Request Error:', { request: error.request });
    } else {
      logger.error('API Error:', { message: error.message });
    }
    return null;
  }
}

exports.toprated = async (req, res, next) => {
  try {
    const apiMovies = await fetchMovies(url.toprated);
    if (apiMovies && apiMovies.results && apiMovies.results.length > 0) {
      return res.status(200).json({
        message: 'Successfully fetched top-rated movies from the API',
        movies: apiMovies.results
      });
    }

    const dbMovies = await Movie.find({ topRated: true }).limit(10);
    if (dbMovies.length === 0) {
      logger.info('No top-rated movies found in the database');
      return res.status(404).json({ message: 'No top-rated movies found' });
    }

    res.status(200).json({
      message: 'Successfully fetched top-rated movies from the database',
      movies: dbMovies
    });
  } catch (error) {
    logger.error('Could not fetch top-rated movies', { error });
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.nowplaying = async (req, res, next) => {
  try {
    const apiMovies = await fetchMovies(url.nowplaying);
    if (apiMovies && apiMovies.results && apiMovies.results.length > 0) {
      return res.status(200).json({
        message: 'Successfully fetched now-playing movies from the API',
        movies: apiMovies.results
      });
    }

    const dbMovies = await Movie.find({ nowPlaying: true }).limit(10);
    if (dbMovies.length === 0) {
      logger.info('No now-playing movies found in the database');
      return res.status(404).json({ message: 'No now-playing movies found' });
    }

    res.status(200).json({
      message: 'Successfully fetched now-playing movies from the database',
      movies: dbMovies
    });
  } catch (error) {
    logger.error('Could not fetch now-playing movies', { error });
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.popular = async (req, res, next) => {
  try {
    const apiMovies = await fetchMovies(url.popular);
    if (apiMovies && apiMovies.results && apiMovies.results.length > 0) {
      return res.status(200).json({
        message: 'Successfully fetched popular movies from the API',
        movies: apiMovies.results
      });
    }

    const dbMovies = await Movie.find({ popular: true }).limit(10);
    if (dbMovies.length === 0) {
      logger.info('No popular movies found in the database');
      return res.status(404).json({ message: 'No popular movies found' });
    }

    res.status(200).json({
      message: 'Successfully fetched popular movies from the database',
      movies: dbMovies
    });
  } catch (error) {
    logger.error('Error fetching popular movies', { error });
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.upcoming = async (req, res, next) => {
  try {
    const apiMovies = await fetchMovies(url.upcoming);
    if (apiMovies && apiMovies.results && apiMovies.results.length > 0) {
      return res.status(200).json({
        message: 'Successfully fetched upcoming movies from the API',
        movies: apiMovies.results
      });
    }

    const dbMovies = await Movie.find({ upcoming: true }).limit(10);
    if (dbMovies.length === 0) {
      logger.info('No upcoming movies found in the database');
      return res.status(404).json({ message: 'No upcoming movies found' });
    }

    res.status(200).json({
      message: 'Successfully fetched upcoming movies from the database',
      movies: dbMovies
    });
  } catch (error) {
    logger.error('Error fetching upcoming movies', { error });
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.trending = async (req, res, next) => {
  try {
    const apiMovies = await fetchMovies(url.trending);
    if (apiMovies && apiMovies.results && apiMovies.results.length > 0) {
      return res.status(200).json({
        message: 'Successfully fetched trending movies from the API',
        movies: apiMovies.results
      });
    }

    const dbMovies = await Movie.find().limit(10);
    if (dbMovies.length === 0) {
      logger.info('No trending movies found in the database');
      return res.status(404).json({ message: 'No trending movies found' });
    }

    res.status(200).json({
      message: 'Successfully fetched trending movies from the database',
      movies: dbMovies
    });
  } catch (error) {
    logger.error('Error fetching trending movies', { error });
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.addMany = async (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    const movies = data.map(movie => ({
      title: movie.title,
      poster_path: movie.poster_path,
      topRated: movie.topRated || false,
      nowPlaying: movie.nowPlaying || false,
      popular: movie.popular || false,
      upcoming: movie.upcoming || false
    }));

    const result = await Movie.insertMany(movies);

    res.status(201).json({
      message: 'Movies successfully added',
      movies: result
    });
  } catch (error) {
    logger.error('Could not add movies to database', { error });
    res.status(500).json({ message: 'Internal Server Error' });
  }
};