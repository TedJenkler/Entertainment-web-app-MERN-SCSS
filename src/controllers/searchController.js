const axios = require('axios');
const logger = require('../utils/logger');
require('dotenv').config();

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.API_TOKEN}`
    }
};

const searchUrls = [
    `https://api.themoviedb.org/3/search/collection?query=`,
    `https://api.themoviedb.org/3/search/movie?query=`,
    `https://api.themoviedb.org/3/search/tv?query=`,
];

exports.search = async (req, res, next) => {
    const query = req.query.query;
    const page = parseInt(req.query.page, 10) || 1;

    if (!query || typeof query !== 'string' || !query.trim()) {
        return res.status(400).json({ message: 'Invalid query parameter' });
    }

    if (isNaN(page) || page < 1) {
        return res.status(400).json({ message: 'Invalid page parameter' });
    }

    const trySearch = async (urls) => {
        for (const baseUrl of urls) {
            const url = `${baseUrl}${encodeURIComponent(query)}&page=${page}`;
            try {
                const response = await axios.get(url, options);
                if (response.data && response.data.results && response.data.results.length > 0) {
                    return response.data;
                }
            } catch (error) {
                logger.error('Error while searching with URL', { url, error });
            }
        }
        return null;
    };

    try {
        const results = await trySearch(searchUrls);
        if (!results || results.results.length === 0) {
            logger.error('Cannot find any data by search', { query });
            return res.status(404).json({ message: 'Cannot find data' });
        }

        res.status(200).json({
            message: 'Successfully found data',
            query: query,
            data: results.results,
            pages: results
        });
    } catch (error) {
        logger.error('Error finding results', { error });
        res.status(500).json({ message: 'Internal Server Error' });
    }
};