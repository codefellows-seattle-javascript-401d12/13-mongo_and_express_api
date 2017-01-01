'use strict';

const Router = require('express').Router;
const jsonparser = require('body-parser').json();
const Director = require('../model/directors.js');
const debug = require('debug')('movies:directors-routes');
const directorRouter = module.exports = new Router();

directorRouter.post('/api/director', jsonparser, function(req, res, next) {
  debug('POST: /api/director');

  req.body.timestamp = new Date();
  new Director(req.body).save()
    .then( director => {
      debug('then - directorRouter.post - 1st');

      res.json(director);
    })
    .catch(next);
});

directorRouter.post('/api/director/:directorId/movie', jsonparser, function(req, res, next) {
  debug('POST: /api/director/:directorId/movie');

  Director.findByIdAndAddMovie(req.params.directorId, req.body)
    .then( movies => {
      debug('then - Director.findByIdAndAddMovie - 1st');

      return res.json(movies);
    })
    .catch(next);
});


directorRouter.get('/api/director/:id', function(req, res, next) {
  debug('GET: /api/director/:id');

  Director.findById(req.params.id)
    .populate('movies')
    .then( director => {
      debug('then - Director.findById - 1st');

      res.json(director);
    })
    .catch(next);
});

directorRouter.put('/api/director/:id', jsonparser, function(req, res, next) {
  debug('PUT: /api/director/:id');

  Director.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then( director => {
      debug('then - Director.findByIdAndUpdate - 1st');
      
      res.json(director);
    })
    .catch(next);
});

directorRouter.delete('/api/director/:id', function(req, res, next) {
  debug('DELETE: /api/director/:id');

  Director.findByIdAndRemove(req.params.id)
    .then( () => {
      debug('then - Director.findByIdAndRemove - 1st');

      res.status(204).end();
    })
    .catch(next);
});
