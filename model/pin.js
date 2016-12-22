'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pinSchema = Schema({
  title: { type: String, required: true },
  skill: { type: String, required: true },
  timestamp: { type: Date, required: true }
});

module.exports = mongoose.model('list', pinSchema);
