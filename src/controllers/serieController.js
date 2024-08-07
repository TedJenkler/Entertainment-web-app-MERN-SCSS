const axios = require('axios');
const Serie = require('../models/serieModel');
const logger = require('../utils/logger');
require('dotenv').config();

const url = {
  trending: 'https://api.themoviedb.org/3/trending/tv/day?language=en-US',
  airingtoday: 'https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1',
  onair: 'https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1',
  popular: 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1',
  toprated: 'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1'
};

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.API_TOKEN}`
  }
};

async function fetchSeries(url) {
  try {
    const response = await axios({ url, ...options });
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

exports.airingtoday = async (req, res, next) => {
  try {
    const apiSeries = await fetchSeries(url.airingtoday);
    if (apiSeries && apiSeries.results && apiSeries.results.length > 0) {
      return res.status(200).json({
        message: 'Successfully fetched series airing today from the API',
        series: apiSeries.results
      });
    }

    const series = await Serie.find({ airingToday: true }).limit(10);
    if (series.length === 0) {
      logger.info('No series airing today found in the database');
      return res.status(404).json({ message: 'No series airing today found' });
    }

    return res.status(200).json({
      message: 'Successfully fetched series airing today from the database',
      series: series
    });

  } catch (error) {
    logger.error('Error fetching series airing today', {
      error: error.message,
      stack: error.stack
    });
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.onair = async (req, res, next) => {
  try {
    const apiSeries = await fetchSeries(url.onair);
    if (apiSeries && apiSeries.results && apiSeries.results.length > 0) {
      return res.status(200).json({
        message: 'Successfully fetched series on air from the API',
        series: apiSeries.results
      });
    }

    const series = await Serie.find({ onAir: true }).limit(10);
    if (series.length === 0) {
      logger.info('No series on air found in the database');
      return res.status(404).json({ message: 'No series on air found' });
    }

    return res.status(200).json({
      message: 'Successfully fetched series on air from the database',
      series: series
    });

  } catch (error) {
    logger.error('Error fetching series on air', {
      error: error.message,
      stack: error.stack
    });
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.popular = async (req, res, next) => {
  try {
    const apiSeries = await fetchSeries(url.popular);
    if (apiSeries && apiSeries.results && apiSeries.results.length > 0) {
      return res.status(200).json({
        message: 'Successfully fetched popular series from the API',
        series: apiSeries.results
      });
    }

    const series = await Serie.find({ popular: true }).limit(10);
    if (series.length === 0) {
      logger.info('No popular series found in the database');
      return res.status(404).json({ message: 'Cannot find popular series' });
    }

    return res.status(200).json({
      message: 'Successfully fetched popular series from the database',
      series: series
    });

  } catch (error) {
    logger.error('Error fetching popular series', {
      error: error.message,
      stack: error.stack
    });
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.toprated = async (req, res, next) => {
  try {
    const apiSeries = await fetchSeries(url.toprated);
    if (apiSeries && apiSeries.results && apiSeries.results.length > 0) {
      return res.status(200).json({
        message: 'Successfully fetched top-rated series from the API',
        series: apiSeries.results
      });
    }

    const series = await Serie.find({ topRated: true }).limit(10);
    if (series.length === 0) {
      logger.info('No top-rated series found in the database');
      return res.status(404).json({ message: 'Cannot find top-rated series' });
    }

    return res.status(200).json({
      message: 'Successfully fetched top-rated series from the database',
      series: series
    });

  } catch (error) {
    logger.error('Error fetching top-rated series', {
      error: error.message,
      stack: error.stack
    });
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.trending = async (req, res, next) => {
  try {
    const apiSeries = await fetchSeries(url.trending);
    if (apiSeries && apiSeries.results && apiSeries.results.length > 0) {
      return res.status(200).json({
        message: 'Successfully fetched trending series from the API',
        series: apiSeries.results
      });
    }

    const series = await Serie.find().limit(10);
    if (series.length === 0) {
      logger.info('No trending series found in the database');
      return res.status(404).json({ message: 'Cannot find TV shows' });
    }

    return res.status(200).json({
      message: 'Successfully fetched trending series from the database',
      series: series
    });

  } catch (error) {
    logger.error('Error fetching trending TV shows', {
      error: error.message,
      stack: error.stack
    });
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.addMany = async (req, res, next) => {
  try {
      const { data } = req.body;

      logger.info('Received data for adding series', { data });

      if (!Array.isArray(data) || data.length === 0) {
          logger.error('Invalid input data: Data should be a non-empty array', { data });
          return res.status(400).json({ message: 'Invalid input data' });
      }

      const series = data.map(serie => ({
          title: serie.title,
          poster_path: serie.poster_path,
          airingToday: serie.airingToday || false,
          onAir: serie.onAir || false,
          popular: serie.popular || false,
          topRated: serie.topRated || false
      }));

      logger.info('Transformed series data', { series });

      const result = await Serie.insertMany(series);

      logger.info('Successfully added series', { result });

      res.status(201).json({
          message: 'Series successfully added',
          series: result
      });
  } catch (error) {
      logger.error('Error adding series', { error: error.message, stack: error.stack });

      res.status(500).json({ message: 'Internal Server Error' });
  }
};