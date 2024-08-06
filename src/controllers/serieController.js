const Serie = require('../models/serieModel');
const logger = require('../utils/logger');

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

exports.airingtoday = async (req, res, next) => {
  try {
    const series = await Serie.find({ airingToday: true }).limit(10);
    if (series.length === 0) {
      logger.error('Could not find any series airing today in the database');
      return res.status(404).json({ message: 'No series airing today found' });
    }

    res.status(200).json({
      message: 'Successfully fetched series airing today from the database',
      series: series
    });
  } catch (error) {
    logger.error('Could not fetch series airing today from the database', { error: error.message, stack: error.stack });
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.onair = async (req, res, next) => {
  try {
    const series = await Serie.find({ onAir: true });
    if(series.length === 0) {
      logger.error('Could not find any series onair in the database');
      return res.status(404).json({ message: 'No series onair found' });
    }

    res.status(200).json({
      message: 'Successfully fetched series airing today from the database',
      series: series
    });
  }catch (error) {
    logger.error('Could not fetch series airing today from the database', { error: error.message, stack: error.stack });
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.popular = async (req, res, next) => {
  try {
    const series = await Serie.find({ popular: true }).limit(10);
    if (series.length === 0) {
      logger.error('Cannot find popular TV shows');
      return res.status(404).json({ message: 'Cannot find popular TV shows' });
    }

    res.status(200).json({
      message: 'Successfully found popular TV shows',
      series: series
    });
  } catch (error) {
    logger.error('Error fetching popular TV shows', { error: error.message, stack: error.stack });
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.toprated = async (req, res, next) => {
  try {
    const series = await Serie.find({ topRated: true }).limit(10);
    if (series.length === 0) {
      logger.error('Cannot find top-rated TV shows');
      return res.status(404).json({ message: 'Cannot find top-rated TV shows' });
    }

    res.status(200).json({
      message: 'Successfully found top-rated TV shows',
      series: series
    });
  } catch (error) {
    logger.error('Error fetching top-rated TV shows', { error: error.message, stack: error.stack });
    res.status(500).json({ message: 'Internal Server Error' });
  }
};