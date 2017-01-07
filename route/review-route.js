'use strict';

const Router = require('express').Router;
const parseJSON = require('body-parser').json();
const BEV = require('../model/bev.js');
const Review = require('../model/review.js');
const createError = require('http-errors');

const reviewRouter = module.exports = new Router();

reviewRouter.post('/api/bev/:vehicleID/review', parseJSON, function(req, res, next) {
  BEV.findByIdAndAddReview(req.params.vehicleID, req.body)
  .then( review => res.json(review))
  .catch(next);
});

reviewRouter.get('/api/bev/:vehicleID/review/:id', function(req, res, next) {
  Review.findById(req.params.id)
  .then( review => {
    if (review === null) return next(createError(400, 'Bad Request'));
    res.json(review);
  })
  .catch( err => next(createError(404, err.message)));
});
