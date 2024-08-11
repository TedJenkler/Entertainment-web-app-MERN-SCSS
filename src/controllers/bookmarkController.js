const { default: axios } = require('axios');
const logger = require('../utils/logger');
require('dotenv').config();

const options = {
    method: 'POST',
    headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer ${process.env.API_TOKEN}`
    },
};

exports.add = async (req, res, next) => {
    const { userid, media_id, media_type } = req.body;
    const url = `https://api.themoviedb.org/3/account/${userid}/watchlist`;

    try {
        const response = await axios({
            url,
            method: options.method,
            headers: options.headers,
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