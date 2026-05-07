import Winston from 'winston';

const logger = Winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: Winston.format.combine(
    Winston.format.timestamp(),
    Winston.format.json()
  ),
  transports: [
    new Winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new Winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new Winston.transports.Console({ format: Winston.format.simple() }));
}

module.exports = logger;
