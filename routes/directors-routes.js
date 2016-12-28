'use strict';

const Router = require('express').Require;
const jsonparser = require('body-parser').json();
const createError = require('http-errors');
const Director = require('../model/directors.js');
const debug = require('debug')('movies:directors-routes');
const directorRouter = module.exports = new Router();



directorRouter.post('/api/director', jsonparser, function(req, res, next) {
  debug('POST: /api/director');

  req.body.timestamp = new Date();
  new Director(req.body).save()
    .then( director => res.json(director))
    .catch(next);
});

directorRouter.get('/api/director/:id', function(req, res, next) {
  debug('GET: /api/director/:id');

  Director.findById(req.params.id)
    .populate('movies')
    .then( director => res.json(director))
    .catch(next);
});

directorRouter.put('/api/director/:id', jsonparser, function(req, res, next) {
  debug('PUT: /api/director/:id');

  Director.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then( director => req.json(director))
    .catch(next);
});

directorRouter.delete('/api/director/:id', function(req, res, next) {
  debug('DELETE: /api/director/:id');

  Director.findByIdAndRemove(req.params.id)
    .then( () => res.status(204).end())
    .catch(next);
});
