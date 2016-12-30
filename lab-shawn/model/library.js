'use strict';

const mongoose = require('mongoose');
const createError = require('http-errors');
const debug = require('debug')('library:library');
const Schema = mongoose.Schema;

const Book = require('./book.js');

const librarySchema = Schema({
  name: {type: String, required: true},
  timestamp: {type: Date, required: true},
  books: [{type: Schema.Types.ObjectId, ref: 'book'}]
});

const Library = module.exports = mongoose.model('library', librarySchema);

Library.findByIdAndAddBook = function(id,book){
  debug('findByIdAndAddBook');
  
  return Library.findById(id)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(library => {
    book.libraryID = library._id;
    this.tempLibrary = library;
    return new Book(book).save();
  })
  .then(book => {
    if(!book) return createError(400);
    this.tempLibrary.books.push(book._id);
    this.tempBook = book;
    return this.tempLibrary.save();
  })
  .then( () => {
    return this.tempBook;
  });
};
