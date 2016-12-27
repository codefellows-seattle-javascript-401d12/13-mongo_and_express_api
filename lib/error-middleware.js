'use strict';

const createError = require('http-errors');
const debug = require('debug')('movies:error-middleware');

module.exports = function(err, req, res, next) {
  debug('error-middleware');

  console.error('error', err);

  if(err.status) {
    debug('user error');

    res.status(err.status).send(err.name);
    next();
    return;
  }

  if(err.name === 'ValidationError') {
    debug('Validation Error');

    err = createError(400, err.message);
    res.status(err.status).send(err.name);
    next();
    return;
  }

  if(err.name === 'CastError') {
    debug('Cast Error');

    err = createError(404, err.message);
    res.status(err.status).send(err.name);
    next();
    return;
  }

  debug('server error');
  err = createError(500, err.message);
  res.status(err.status).send(err.name);
  next();
};
