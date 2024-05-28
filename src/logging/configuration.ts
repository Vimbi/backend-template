import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { appName, timeZone } from '../common/config';
import * as moment from 'moment';

const options = {
  file: {
    json: true,
    datePattern: 'DD-MM-YYYY',
    handleExceptions: false,
    handleRejections: false,
    zippedArchive: true,
    maxSize: '5m',
    maxFiles: '30d',
  },
  console: {
    level: 'debug',
    handleExceptions: false,
    handleRejections: false,
    json: false,
    colorize: true,
  },
};

const infoTransport = new winston.transports.DailyRotateFile({
  ...options.file,
  level: 'info',
  filename: `${__dirname}/../../logs/info-%DATE%.log`,
});

const errorTransport = new winston.transports.DailyRotateFile({
  ...options.file,
  level: 'error',
  filename: `${__dirname}/../../logs/ERRORS-%DATE%.log`,
});

const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp(),
    winston.format.ms(),
    nestWinstonModuleUtilities.format.nestLike(`${appName} API`, {
      prettyPrint: true,
    }),
  ),
});

const timestampFormat = () =>
  new Date().toLocaleString('en-GB', {
    timeZone,
    hour12: false,
  });

export const loggerConfiguration = {
  transports: [infoTransport, errorTransport, consoleTransport],
  format: winston.format.combine(
    winston.format.combine(),
    winston.format.timestamp({
      format: timestampFormat,
    }),
    winston.format.printf(
      (info) =>
        `[${moment(info.timestamp).format('DD-MM-YYYY, HH:mm Z')}] ${info.level}: ${info.message}`,
    ),
  ),
  exitOnError: false,
};
