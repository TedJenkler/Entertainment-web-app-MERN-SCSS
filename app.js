const express = require('express');
const logger = require('./src/utils/logger');

const app = express();
const port = process.env.PORT || 2000;

app.listen(port, () => {
  logger.info(`App listening at http://localhost:${port}`)
});