const express = require('express');
const logger = require('./src/utils/logger');
const userRoutes = require('./src/routes/userRoutes');
const connectDB = require('./src/config/db');
const errorHandler = require('./src/middlewere/errorHandler');
const dotenv = require('dotenv')

const app = express();
dotenv.config();

const startServer = async () => {
    try {
        await connectDB();

        app.use(express.json());
        app.use('/api/users', userRoutes);

        app.use(errorHandler);

        const port = process.env.PORT || 2000;
        app.listen(port, () => {
            logger.info(`App listening at http://localhost:${port}`);
        });
    } catch (error) {
        logger.error(`Failed to start server: ${error.message}`);
        process.exit(1);
    }
};

startServer();