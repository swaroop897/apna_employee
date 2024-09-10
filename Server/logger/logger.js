import winston from 'winston';
import path from 'path';
import fs from 'fs';
import DailyRotateFile from 'winston-daily-rotate-file';

// Define the log file path
const logDirectory = path.join(path.resolve(), 'logs');

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// Create a logger instance with daily rotation
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new DailyRotateFile({
      filename: path.join(logDirectory, 'application-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxFiles: '1d', // Automatically delete logs older than 1 day
    }),
  ],
});

export default logger;
