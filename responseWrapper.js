const { APPLICATION_JSON } = require('../common/constants');

// creation of generic response for the API
const successResponse = (body, status) => {
  const response = {};
  response.isBase64Encoded = false;
  response.statusCode = status || 200;
  response.headers = {
    'Content-Type': APPLICATION_JSON,
    'Access-Control-Allow-Origin': '*',
  };
  response.body = JSON.stringify(body);
  return response;
};

const genericResponse = body => ({ statusCode: 200, body });

const errorResponse = (error) => {
  const response = {};
  response.isBase64Encoded = false;
  if (typeof error.statusCode !== 'undefined') {
    response.statusCode = error.statusCode;
  } else {
    response.statusCode = 400;
  }
  response.headers = {
    'Content-Type': APPLICATION_JSON,
    'Access-Control-Allow-Origin': '*',
  };
  response.body = JSON.stringify(error.message) || error;
  logger.error(`\n error response body: ${JSON.stringify(error)} \n`, {
    trace: error,
  });
  return response;
};

const badResponse = (error) => {
  console.log('Bad Response obtained:', error);
  logger.error(`\n Bad Response obtained: ${error.message} \n`, {
    trace: error,
  });
  const response = {};
  response.isBase64Encoded = false;
  if (error && typeof error.statusCode !== 'undefined') {
    response.statusCode = error.statusCode || 400;
  } else {
    response.statusCode = 500;
  }
  response.headers = {
    'Content-Type': APPLICATION_JSON,
    'Access-Control-Allow-Origin': '*',
  };
  response.body = `{ message: ${(error.message)}}` || error || 'Bad Request';
  // logger.error(`\n bad response body: ${JSON.stringify(response)} \n`);
  return response;
};

module.exports = {
  successResponse,
  genericResponse,
  errorResponse,
  badResponse,
};
