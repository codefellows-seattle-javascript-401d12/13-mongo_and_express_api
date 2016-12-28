'use strict';

const mongoose = require('mongoose');
const createError = require('http-errors');
const debug = require('debug')('movies:directors');
const Schema = mongoose.Schema;

const Movie = require('./movies.js');

const directorSchema = Schema({
  name: { type: String, require: true},
  timestamp: { type: Date, require: true},
  movies: [{ type: Schema.Types.ObjectId, ref: 'movies'}]
});

const Director = module.exports = mongoose.model('directors', directorSchema);

Director.findByIdAndAddMovie = function(id, movie) {
  debug('findByIdAndAddMovie');

  return Director.findById(id)
    .catch(err => Promise.reject(createError(404, err.message)))
    .then( director => {
      movie.directorID = director._id;
      this.tempDirector = director;
      return new Movie(movie).save();
    })
    .then(movie => {
      this.tempDirector.movies.push(movie._id);
      this.tempMovie = movie;
      return this.tempList.save();
    })
    .then( () => {
      return this.tempMovie;
    });
};
