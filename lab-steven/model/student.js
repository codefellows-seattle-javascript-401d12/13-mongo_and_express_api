'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = Schema({
  name: {type: String, required: true},
  age: {type: Number, required: true},
  timestamp: {type: Date, required: true}
});

module.exports = mongoose.model('student', studentSchema);
