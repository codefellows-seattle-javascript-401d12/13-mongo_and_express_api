'use strict';

const Router = require('express').Router;
const debug = require('debug')('movies:movies-routes');
const jsonparser = require('body-parser').json();
// const Director = require('../model/directors.js');
const Movie = require('../model/movies.js');

const moviesRouter = module.exports = new Router();
// const directorRouter = module.exports = new Router();

// directorRouter.post('/api/director/:directorId/movie', jsonparser, function(req, res, next) {
//   debug('POST: /api/director/:directorId/movie');
//
//   Director.findByIdAndAddMovie(req.params.directorId, req.body)
//     .then( movies => {
//       debug('then - Director.findByIdAndAddMovie - 1st');
//
//       return res.json(movies);
//     })
//     .catch(next);
// });

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

  Movie.findByIdAndRemove(req.params.id)
    .then( () => res.status(204).end())
    .catch(next);
});
