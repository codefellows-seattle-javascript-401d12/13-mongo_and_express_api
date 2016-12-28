'use strict';

const Router = require('express').Router;
const debug = require('debug')('movies:movies-routes');
const jsonparser = require('body-parser').json();
const Director = require('../model/directors.js');
const directorRouter = module.exports = new Router();

directorRouter.post('/api/director/:directorId/movie', jsonparser, function(req, res, next) {
  debug('POST: /api/director/:directorId/movie');

  Director.findByIdAndAddMovie(req.params.movieId, req.body)
    .then( movie => req.json(movie))
    .catch(next);
});
