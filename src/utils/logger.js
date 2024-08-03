const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, errors, json } = format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level}]: ${stack || message}`;
});

const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        json(),
        logFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/app.log' }),
    ],
    exitOnError: false,
});

module.exports = logger