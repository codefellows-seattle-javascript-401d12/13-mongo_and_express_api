'use strict';

const mongoose = require('mongoose');
const createError = require('http-errors');
const debug = require('debug')('movies:directors');
const Schema = mongoose.Schema;

const Movie = require('./movies.js');

const directorSchema = Schema({
  name: { type: String, required: true},
  timestamp: { type: Date, required: true},
  movies: [{ type: Schema.Types.ObjectId, ref: 'movie'}]
});

const Director = module.exports = mongoose.model('directors', directorSchema);

Director.findByIdAndAddMovie = function(id, movie) {
  debug('findByIdAndAddMovie');

  return Director.findById(id)
    .catch(err => Promise.reject(createError(404, err.message)))
    .then( director => {
      debug('then - Director.findById - 1st');

      movie.directorID = director._id;
      this.tempDirector = director;
      movie.timestamp = new Date();
      return new Movie(movie).save();
    })
    .then(movie => {
      debug('then - Director.findById - 2nd');

      this.tempDirector.movies.push(movie._id);
      this.tempMovie = movie;
      return this.tempDirector.save();
    })
    .then( () => {
      debug('then - Director.findById - 3rd');

      return this.tempMovie;
    });
};
