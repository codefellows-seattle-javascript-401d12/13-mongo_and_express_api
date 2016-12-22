'use strict';

//TODO: ADD error middleware
const createError = require('http-errors');
const debug = require('debug')('movies:error-middleware');

module.exports = function(err, req, res, next) {
  debug('error-middleware');

  if(err.status) {
    debug('user error');

    res.status(err.status).send(err.name);
    next();
    return;
  }

  debug('server error');
  err = createError(500, err.message);
  res.status(err.status).send(err.name);
  next();
};
