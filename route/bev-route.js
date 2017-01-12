'use strict';

const Router = require('express').Router;
const parseJSON = require('body-parser').json();
const createError = require('http-errors');

const BEV = require('../model/bev.js');
const bevRouter = module.exports = new Router();

bevRouter.post('/api/bev', parseJSON, function(req, res, next) {
  req.body.lastupdated = new Date();
  new BEV(req.body).save()
  .then( vehicle => res.json(vehicle))
  .catch(next);
});

bevRouter.get('/api/bev/:id', function(req, res, next) {
  BEV.findById(req.params.id)
  .populate('reviews')
  .then( vehicle => {
    if (vehicle === null) return next(createError(404, err.message));
    res.json(vehicle);
  })
  .catch( err => next(createError(404, err.message)));
});

bevRouter.get('/api/bev/', function(req, res, next) {
  BEV.find({})
  .then( vehicles => {
    if (vehicles.length === 0) return Promise.reject(createError(416, 'Out of range'));
    res.json(vehicles.map(vehicle => vehicle._id));
  })
  .catch( err => next(err));
});

bevRouter.put('/api/bev/:id', parseJSON, function(req, res, next) {
  if (Object.getOwnPropertyNames(req.body).length === 0) return next(createError(400, 'Bad Request'));
  BEV.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then( vehicle => {
    if (vehicle === null) return next(createError(404, err.message));
    res.json(vehicle);
  })
  .catch( err => {
    if (err.name === 'ValidationError') return next(err);
    next(createError(404, err.message));
  });
});

bevRouter.delete('/api/bev/:id', function(req, res, next) {
  BEV.findByIdAndRemove(req.params.id)
  .then( vehicle => {
    if (vehicle === null) return next(createError(404, err.message));
    res.status(204).send();
  })
  .catch( err => next(createError(404, err.message)));
});
