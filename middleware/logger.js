import winston from 'winston';

const options = {
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.Console(options.console),
    new winston.transports.File({
      filename: 'log.txt',
      options: { flags: 'w' },
    }),
  ],
  exitOnError: false,
});

export default logger;
