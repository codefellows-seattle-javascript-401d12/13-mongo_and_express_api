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
//TODO: Create a get route
  //find movies by id from movie constructor
  //should pass the id of a resource through the url endpoint to get a resource
    //this should use `req.params`, not querystring parameters

//TODO: Create a put route
  //should pass data as stringifed JSON in the body of a put request to update a pre-existing resource

//TODO: Create a delete route
  //should pass the id of a resource though the url endpoint to delete a resource
    //this should use `req.params`
    //res should have status of 204 and then end
