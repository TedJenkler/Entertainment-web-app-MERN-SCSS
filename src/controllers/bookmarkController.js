const axios = require('axios');
const logger = require('../utils/logger');
require('dotenv').config();

const postOptions = {
    method: 'POST',
    headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer ${process.env.API_TOKEN}`
    }
};

const getOptions = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.API_TOKEN}`
    }
};

exports.add = async (req, res, next) => {
    const { userid, media_id, media_type } = req.body;
    const url = `https://api.themoviedb.org/3/account/${userid}/watchlist`;

    try {
        const response = await axios({
            ...postOptions,
            url,
            data: {
                media_type,
                media_id,
                watchlist: true
            }
        });

        res.status(200).json({ message: 'Bookmark added successfully', data: response.data });
    } catch (error) {
        logger.error('Cannot add bookmark', { error });
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.movies = async (req, res, next) => {
    const { userid } = req.body;
    const url = `https://api.themoviedb.org/3/account/${userid}/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc`;

    try {
        const response = await axios({
            ...getOptions,
            url
        });

        res.status(200).json({ message: "Movies fetched successfully", data: response.data });
    } catch (error) {
        logger.error('Cannot fetch movies', { error });
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.series = async (req, res, next) => {
    const { userid } = req.body;
    const url = `https://api.themoviedb.org/3/account/${userid}/watchlist/tv?language=en-US&page=1&sort_by=created_at.asc`;

    try {
        const response = await axios({
            ...getOptions,
            url
        });

        res.status(200).json({ message: "Series fetched successfully", data: response.data });
    } catch (error) {
        logger.error('Cannot fetch series', { error });
        res.status(500).json({ message: 'Internal Server Error' });
    }
};