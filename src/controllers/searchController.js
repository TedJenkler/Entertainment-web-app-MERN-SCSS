const logger = require('../utils/logger');
const axios = require('axios');
require('dotenv').config();

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.API_TOKEN}`
    }
};

const searchUrls = [
    `https://api.themoviedb.org/3/search/multi?query=`,
    `https://api.themoviedb.org/3/search/collection?query=`,
    `https://api.themoviedb.org/3/search/keyword?query=`,
    `https://api.themoviedb.org/3/search/company?query=`,
];

exports.search = async (req, res, next) => {
    const { query } = req.params;

    const trySearch = async (urls) => {
        for (const baseUrl of urls) {
            const url = `${baseUrl}${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`;
            try {
                const response = await axios.get(url, options);
                if (response.data && response.data.results && response.data.results.length > 0) {
                    return response.data.results;
                }
            } catch (error) {
                logger.error('Error while searching with URL', { url, error });
            }
        }
        return null;
    };

    try {
        const results = await trySearch(searchUrls);
        if (!results || results.length === 0) {
            logger.error('Cannot find any data by search', { query });
            return res.status(404).json({ message: 'Cannot find data' });
        }

        res.status(200).json({
            message: 'Successfully found data',
            data: results
        });
    } catch (error) {
        logger.error('Error finding results', { error });
        res.status(500).json({ message: 'Internal Server Error' });
    }
};