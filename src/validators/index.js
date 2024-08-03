const { validationResult } = require('express-validator');
const logger = require('../utils/logger');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn('Validation failed', {
      errors: errors.array(),
      requestBody: req.body,
      url: req.originalUrl
    });

    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validate };