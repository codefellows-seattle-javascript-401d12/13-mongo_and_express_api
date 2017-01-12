'use strict';

const mongoose = require('mongoose');
const createError = require('http-errors');
const debug = require('debug')('bev:bev');
const Schema = mongoose.Schema;

const Review = require('./review.js');

const bevSchema = Schema({
  vehicle: { type: String, required: true },
  info: { type: String, required: true },
  msrp: { type: Number, required: true },
  range: { type: Number, required: true },
  mpge: { type: Number, required: true },
  lastupdated: { type: Date, default: Date.now },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'review' }]
});

const BEV = module.exports = mongoose.model('bev', bevSchema);

BEV.findByIdAndAddReview = function(id, review) {
  debug('find by ID and add review');

  return BEV.findById(id)
  .catch( err => Promise.reject(createError(404, err.message)))
  .then( vehicle => {
    review.vehicleID = vehicle._id;
    this.tempVehicle = vehicle;
    return new Review(review).save();
  })
  .then( review => {
    this.tempVehicle.reviews.push(review._id);
    this.tempReview = review;
    return this.tempVehicle.save();
  })
  .then( () => {
    return this.tempReview;
  });
};
