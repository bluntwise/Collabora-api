import winston from 'winston';


const isProduction = process.env.NODE_ENV === 'production';


const logger = winston.createLogger(
    {
        level: 'info',
        format: isProduction
            ? winston.format.json() // JSON en prod
            : winston.format.combine( // Format lisible en dev
                winston.format.colorize(),
                winston.format.timestamp(),
                winston.format.printf(({ timestamp, level, message }) => {
                    return `[${timestamp}] ${level}: ${message}`;
                })),
        transports: [new winston.transports.Console()]
    }
)

export default logger;