const Serie = require('../models/serieModel');
const logger = require('../utils/logger');
const Serie = require('../models/serieModel');

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
            airingToday: serie.airingToday || false
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