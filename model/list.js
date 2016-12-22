'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const debug = require('debug')('list:model');



const listSchema = Schema({
  name:{type: 'string', require: true},
  timestamp:{type:Date, require: true},
  place: {type: 'string'}
});

module.exports = mongoose.model('list', listSchema);
