'use strict';

const Router = require('express').Router;
const parseJSON = require('body-parser').json();
const Review = require('../model/review.js');

const reviewRouter = module.exports = new Router();

reviewRouter.post('/api/bev/:vehicleID/review', parseJSON, function(req, res, next) {
  BEV.findByIdAndAddReview(req.params.vehicleID, req.body)
  .then( review => res.json(review))
  .catch(next);
});
