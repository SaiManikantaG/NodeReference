/**
 * Usage: MongoDB connection and time out functional implementation that also include closing connection before exiting the process
 * Different options are available and can be extended based on future use and implementation.
 */
const mongoose = require('mongoose');
const { getConnectionString } = require('./dbUtility');
require('dotenv').config();

mongoose.Promise = global.Promise;

/**
 * this function will return a promise and create a connection.
 */

module.exports = async () => {
  if (
    global
    && global.cachedConnection
    && global.cachedConnection.readyState
    && global.cachedConnection.readyState === 1
  ) {
    console.log('** using global cache ordering connection:***');
    // logger.info(`** using global cache connection:***`);
    return global.connectionPromise;
  }
  const hrstart = process.hrtime();
  console.log(' *** No connection Found. Creating ordering connection !!!');
  // logger.info(' *** No connection Found. Creating connection !!!');

  const MDBOOLSIZE = process.env.MDBoolSize;
  const keepAlive = process.env.KeepAlive;
  const mongoDB = getConnectionString.ordering();
  // const mongoDB = MONGODB_URI ? MONGODB_URI : process.env.MONGODB_URI;
  try {
    const connectionPromise = mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      poolSize: MDBOOLSIZE || process.env.MDBPOOLSIZE,
      connectTimeoutMS: process.env.connectTimeoutMS,
      socketTimeoutMS: process.env.socketTimeoutMS,
      keepAlive: keepAlive || process.env.keepAlive,
    });

    global.connectionPromise = connectionPromise;
    connectionPromise.then(
      () => {
        const { connection } = mongoose;
        if (connection) {
          const hrend = process.hrtime(hrstart);
          const timeTakenInSeconds = hrend[0] + hrend[1] / 1000000000;
          console.log(
            `***ordering Connection SUCCESS! Time to connect: ***${timeTakenInSeconds}`,
          );
          console.log(
            `***ordering Connection SUCCESS! Time to connect: ***${timeTakenInSeconds}`,
          );
          global.cachedConnection = connection;
          connection.on('error', (err) => {
            console.log('Mongoose default connection error: ', err);
            global.cachedConnection.close();
            global.cachedConnection = null;
          });

          connection.on('disconnected', () => {
            console.log('ordering Connection DISCONNECTED');
            // console.log('ordering Connection DISCONNECTED');
            global.cachedConnection.close();
            global.cachedConnection = null;
          });

          connection.on('close', () => {
            console.log('Connection CLOSE');
            // logger.info('Connection CLOSE');
            global.cachedConnection.close();
            global.cachedConnection = null;
          });

          process.on('SIGINT', () => {
            console.log('Closing the ordering connection before process exit');
            // logger.info('Closing the ordering connection before process exit');
            connection.close(() => {
              process.exit(0);
            });
            if (global.cachedConnection) {
              global.cachedConnection.close();
            }
          });
        } else {
          // eslint-disable-next-line no-lonely-if
          if (global.cachedConnection) {
            global.cachedConnection.close();
            global.cachedConnection = null;
          }
        }
      },
      (reason) => {
        if (global.cachedConnection) {
          global.cachedConnection.close();
          global.cachedConnection = null;
        } // Retry connection during next call
        return Promise.reject(reason);
      },
    );
    return global.connectionPromise;
  } catch (error) {
    if (global.cachedConnection) {
      global.cachedConnection.close();
      global.cachedConnection = null;
    }
    return Promise.reject(error);
  }
};
