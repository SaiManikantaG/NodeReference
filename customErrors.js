/**
 * **** V 2.0, Date: 04-01-2019
**** Author : Sai Manikanta G
**** Changelog: Custom error set for all the genric errors occuring inside the process.
 */

class CustomErrors extends Error {
  constructor(message) {
    super(message);
    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name;
    // This clips the constructor invocation from the stack trace.
    // It's not absolutely essential, but it does make the stack trace a little nicer.
    Error.captureStackTrace(this, this.constructor);
  }
}
class InputValidationError extends CustomErrors {
  constructor(message) {
    super(`With validation: ${message} was not found.`);
    this.data = message;
  }
}
class DatabaseOperationException extends CustomErrors {
  constructor(message) {
    super(`While performing database operation: ${message}.`);
    this.data = message;
  }
}
class ProcessException extends CustomErrors {
  constructor(message) {
    super(`${message}.`);
    this.data = message;
  }
}
class InvalidInputsException extends CustomErrors {
  constructor(message) {
    super(`invalid inputs are provided: ${message}.`);
    this.data = message;
  }
}
class ModelException extends CustomErrors {
  constructor(message) {
    super(`With Mongo model: ${message}.`);
    this.data = message;
  }
}
class EmptyDataException extends CustomErrors {
  constructor(message) {
    super(`No data is returned for given criteria: ${message}.`);
    this.data = message;
  }
}

class APIException extends CustomErrors {
  constructor(message) {
    super(`API Exceptions occured: ${message}.`);
    this.data = message;
  }
}

class FileReadError extends CustomErrors {
  constructor(message) {
    super(`While reading file from s3: ${message}.`);
    this.data = message;
  }
}


module.exports = {
  InputValidationError,
  DatabaseOperationException,
  ProcessException,
  InvalidInputsException,
  ModelException,
  EmptyDataException,
  APIException,
  FileReadError,
};
