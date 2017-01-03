'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bevSchema = Schema({
  vehicle: { type: String, required: true },
  info: { type: String, required: true },
  msrp: { type: Number, required: true },
  range: { type: Number, required: true },
  mpge: { type: Number, required: true },
  lastupdated: { type: Date, required: true }
});

module.exports = mongoose.model('bev', bevSchema);
