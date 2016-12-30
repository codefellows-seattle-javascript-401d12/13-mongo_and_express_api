'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('debug')('library:book');

const bookSchema = Schema({
  title: {type: String, required: true},
  author: {type: String, required: true},
  libraryID: {type: Schema.Types.ObjectId, required: true}
});

module.exports = mongoose.model('book', bookSchema);
