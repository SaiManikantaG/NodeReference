/* eslint-disable no-undef */
/* eslint-disable new-cap */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-disable consistent-return */

require('dotenv').config();

const winston = require('winston');
const cached = false;
let kinesisTransport = null;

// NOTE: To start getting logger.debug and warn in other than dev environment we need set the logger info level as debug/warn accordingly.
// THis initializes the 7-eleven winston logs that pushes logs to stream which goes to logZ (kibana) dashboard
// eslint-disable-next-line no-unused-vars
function initialize(event) {
  try {
    return new Promise(((resolve, reject) => {
      console.log('Initializing components');
      const injectMetaDetails = winston.format((info) => {
        info.team = 'test';
        info.cached = cached;
        info.userId = 'test@test.com';
        info.canonicalId = 'test';
        return info;
      });

      const logger = winston.loggers.add(process.env.ApplicationName, {
        // level: process.env.LogzLogLevel,   // Log only if event level less than or equal to this level
        levels: {
          error: 0,
          warn: 1,
          info: 2,
          verbose: 3,
          debug: 4,
          silly: 5,
        },
        format: winston.format.combine(
          injectMetaDetails(),
          winston.format.json(),
        ),
        exitOnError: false,
        silent: false,
      });
      logger.on('error', (err) => {
        console.error('Unhandled logger error: ', err.message);
        reject(err);
      });

      if (process.env.ENVIRONMENT === 'local') { // DONE: change this to local??
        logger.add(new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            winston.format.simple(),
          ),
          colorize: true,
          level: process.env.LogzLogLevel,
        }));
      } else {
        console.log('into transport');
        kinesisTransport = new (winstonKinesis)({
          kinesisStreamName: process.env.LogsKinesisStream,
          logsWriterRoleArn: process.env.WriterRoleArn,
          application: process.env.ApplicationName,
          environment: process.env.ENVIRONMENT,
          originator: process.env.originator,
        });
        logger.add(kinesisTransport);
      }
      const appName = process.env.ApplicationName;
      global.logger = winston.loggers.get(appName);
      resolve();
    }));
  } catch (exception) {
    reject(`logger Issues:${exception}`);
  }
}

function flushLogs() {
  return new Promise(((resolve, reject) => {
    if (kinesisTransport) {
      console.log('transport object');
      kinesisTransport.flush((err, msg) => {
        console.log('into flushlogs');
        if (err) {
          console.error('Error flushing logs: ', err);
          reject(err);
        } else {
          console.log('Kinesis transport success: ', msg);
          resolve('Logs sent to Kinesis');
        }
      });
    } else {
      resolve('Nothing to flush');
    }
  }));
}

module.exports = {
  initialize,
  flushLogs,
};
