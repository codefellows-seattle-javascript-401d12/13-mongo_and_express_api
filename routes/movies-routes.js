'use strict';

const Router = require('express').Router;
const debug = require('debug')('movies:movies-routes');
const jsonparser = require('body-parser').json();
const Movie = require('../model/movies.js');
const moviesRouter = module.exports = new Router();

moviesRouter.post('/api/movies', jsonparser, function(req, res, next) {
  debug('POST: /api/movies');

  req.body.timestamp = new Date();
  new Movie(req.body).save()
    .then( movie => res.json(movie))
    .catch(next);
});

moviesRouter.get('/api/movies/:id', function(req, res, next) {
  debug('GET: /api/movies');

  Movie.findById(req.params.id)
    .then( movie => res.json(movie))
    .catch(next);
});

moviesRouter.put('/api/movies/:id', jsonparser, function(req, res, next) {
  debug('PUT: /api/movies/:id');

  Movie.findById(req.params.id)
    .then( movie => {
      for (var prop in req.body) {
        if (req.body.hasOwnProperty(prop)) {
          movie[prop] = req.body[prop];
          movie.timestamp = new Date();
        }
      }
      movie.save( err => {
        if(err) res.send(err);
        res.json(movie);
      });
    })
    .catch(next);
});

moviesRouter.delete('/api/movies/:id', function(req, res, next) {
  debug('DELETE: /api/movies/:id');

  Movie.findById(req.params.id).remove().exec()
    .then( () => res.status(204).end())
    .catch(next);
});
