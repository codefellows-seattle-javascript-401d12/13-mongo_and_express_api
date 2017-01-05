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
  .then( vehicle => res.json(vehicle))
  .catch( err => next(createError(404, err.message)));
});

bevRouter.get('/api/bev/', function(req, res, next) {
  BEV.find({})
  .then( vehicles => vehicles.map(vehicle => vehicle._id))
  .then( vehicles => res.json(vehicles))
  .catch( err => next(createError(404, err.message)));
});

bevRouter.put('/api/bev/:id', parseJSON, function(req, res, next) {
  BEV.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then( vehicle => res.json(vehicle))
  .catch( err => {
    if (err.name === 'ValidationError') return next(err);
    next(createError(404, err.message));
  });
});

bevRouter.delete('/api/bev/:id', function(req, res, next) {
  BEV.findByIdAndRemove(req.params.id)
  .then( () => res.status(204).send())
  .catch( err => next(createError(404, err.message)));
});
