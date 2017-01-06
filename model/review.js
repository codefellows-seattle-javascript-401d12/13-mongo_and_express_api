'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = Schema ({
  title: { type: String, required: true },
  authorName: { type: String, required: true },
  reviewText: { type: String, required: true },
  rating: { type: Number, min: 1, max: 10, required: true },
  createdOn: { type: Date, default: Date.now },
  reviewID: { type: Schema.Types.ObjectId, required: true }
});

module.exports = mongoose.model('review', reviewSchema);
