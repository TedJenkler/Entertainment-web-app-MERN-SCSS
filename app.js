const express = require('express');
const logger = require('./src/utils/logger');
const userRoutes = require('./src/routes/userRoutes');
const movieRoutes = require('./src/routes/movieRoutes');
const serieRoutes = require('./src/routes/serieRoutes');
const searchRoutes = require('./src/routes/searchRoutes');
const connectDB = require('./src/config/db');
const errorHandler = require('./src/middlewere/errorHandler');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
dotenv.config();

const startServer = async () => {
    try {
        await connectDB();

        app.use(cors({
            origin: 'http://localhost:5173',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization'],
        }));

        app.use(express.json());
        app.use('/api/users', userRoutes);
        app.use('/api/movies', movieRoutes);
        app.use('/api/series', serieRoutes);
        app.use('/api/search', searchRoutes);

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