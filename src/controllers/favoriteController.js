const axios = require('axios');
const logger = require('../utils/logger');
require('dotenv').config();

const postOption = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    Authorization: `Bearer ${process.env.API_TOKEN}`
  }
};

const getOption = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.API_TOKEN}`
  }
};

exports.add = async (req, res, next) => {
  const { userid, media_type, media_id } = req.body;
  if (!userid || !media_type || !media_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const url = `https://api.themoviedb.org/3/account/${userid}/favorite`;

  try {
    const response = await axios({
      ...postOption,
      url: url,
      data: {
        media_type: media_type,
        media_id: media_id,
        favorite: true
      }
    });
    logger.info('Favorite added successfully', { userid, media_type, media_id });
    return res.status(200).json(response.data);
  } catch (error) {
    logger.error('Failed to add favorite', { error: error.message });
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.movies = async (req, res, next) => {
  const { userid } = req.query;
  if (!userid) {
    return res.status(400).json({ error: 'Missing user ID' });
  }

  const url = `https://api.themoviedb.org/3/account/${userid}/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`;

  try {
    const response = await axios({
      ...getOption,
      url: url
    });
    logger.info('Favorite movies fetched successfully', { userid });
    return res.status(200).json({ message: "Movies fetched successfully", data: response.data });
  } catch (error) {
    logger.error('Failed to fetch favorite movies', { error: error.message });
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.series = async (req, res, next) => {
  const { userid } = req.query;
  if (!userid) {
    return res.status(400).json({ error: 'Missing user ID' });
  }

  const url = `https://api.themoviedb.org/3/account/${userid}/favorite/tv?language=en-US&page=1&sort_by=created_at.asc`;

  try {
    const response = await axios({
      ...getOption,
      url: url
    });
    logger.info('Favorite series fetched successfully', { userid });
    return res.status(200).json({ message: "Series fetched successfully", data: response.data });
  } catch (error) {
    logger.error('Failed to fetch favorite series', { error: error.message });
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};