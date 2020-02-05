require('dotenv').config();
const { initialize, flushLogs } = require('../utilities/logInitializer');
const chalk = require('chalk');
const currentEnvironment = process.env.ENVIRONMENT;

// NOTE: logger.debug/warn wont really flush logs in stream unless debug/warn level is set for other than 'local' environments.
// Create a logger instance based on the environment. If environment is local then just console log it or actual winston log
const logger = {
  info: (message, ...params) => {
    if (currentEnvironment === 'devlocal') {
      console.log(chalk.green(message), chalk.green(JSON.stringify(...params)));
    }
  },
  error: (message, ...params) => {
    if (currentEnvironment === 'devlocal') {
      console.log(chalk.red(message), chalk.red(JSON.stringify(...params)));
    }
  },
  warn: (message, ...params) => {
    if (currentEnvironment === 'devlocal') {
      console.log(chalk.yellow(message), chalk.yellow(JSON.stringify(...params)));
    }
  },
  debug: (message, ...params) => {
    if (currentEnvironment === 'devlocal') {
      console.log(chalk.blue(message), chalk.blue(JSON.stringify(...params)));
    }
  },
  trace: (message, ...params) => {
    if (currentEnvironment === 'devlocal') {
      console.log(chalk.white(message), chalk.white(JSON.stringify(...params)));
    }
  },
  silly: (message, ...params) => {
    if (currentEnvironment === 'devlocal') {
      console.log(chalk.blue(message), chalk.blue(JSON.stringify(...params)));
    }
  },
};

/**
 *
 * @param {Object} event Input event object
 */
const startLogging = async (event) => {
  if (currentEnvironment === 'local') {
    global.logger = logger;
  } else {
    console.log('recieved event:', event);
    await initialize(event);
  }
};

const publishLogs = async () => {
  logger.info('flushing logs!!');
  const resultSet = await flushLogs();
  console.log(`log flush results: ${resultSet}`);
};

module.exports = {
  startLogging,
  publishLogs,
};
