'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Library = require('../model/library.js');
const Book = require('../model/book.js');
const debug = require('debug')('library:book-router');
const createError = require('http-errors');


const bookRouter = module.exports = new Router();

bookRouter.post('/api/library/:libraryID/book', jsonParser, function(req,res,next){
  debug('POST: /api/library/:listID/book');


  Library.findByIdAndAddBook(req.params.libraryID, req.body)
  .then( book => {
    if(!req.body) return next(createError(404));
    res.json(book);
  })
  .catch(next);
});

bookRouter.get('/api/library/:libraryID/book/:id', function(req,res,next){
  debug('GET: /api/library/:libraryID/book/:id');

  Library.findById(req.params.libraryID)
  .populate('books')
  .then(() => Book.findById(req.params.id))
  .then(book => {
    if(book === null) return next(createError(404));
    res.json(book);
  })
  .catch(err => next(createError(404,err.message)));
});

bookRouter.put('/api/library/:libraryID/book/:id', jsonParser, function(req,res,next){
  debug('PUT: /api/library/:libraryID/book/:id');


  // if(res.body === null) return next(createError(400));
  Library.findById(req.params.listID)
  .then(() => Book.findByIdAndUpdate(req.params.id, req.body, {new: true}))
  .then(book => {
    // if(req.body === null) return next(createError(400));
    if(book === null) return next(createError(404));
    res.json(book);
  })
  .catch(err => {
    if(err.name === 'ValidationError') return next(err);
    next(createError(404,err.message));
  });
});

bookRouter.delete('/api/library/:libraryID/book/:id', function(req,res,next){
  debug('DELETE: /api/library/:libraryID/book/:id');

  Library.findById(req.params.libraryID)
  .then(() => Library.findByIdAndRemove(req.params.id))
  .then( () => res.status(204).send())
  .catch(err => next(createError(404,err.message)));
});
