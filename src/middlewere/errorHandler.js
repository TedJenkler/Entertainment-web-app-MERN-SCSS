const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {

  logger.error('An error occurred:', { message: err.message, stack: err.stack });

  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error'
    }
  });
};

module.exports = errorHandler;