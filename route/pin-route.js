'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Pin = require('../model/pin.js');
const debug = require('debug')('pin:pin-route');
const pinRouter = module.exports = new Router();

pinRouter.post('/api/pin', jsonParser, function(req, res, next) {
  debug('POST: /api/pin');

  req.body.timestamp = new Date();
  new Pin(req.body).save()
  .then(pin => res.json(pin))
  .catch(next);
});

pinRouter.put('/api/pin/:id', jsonParser, function(req, res, next) {
  debug('PUT: /api/pin/:id');

  req.body.timestamp = new Date();
  Pin.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(pin => res.json(pin))
  .catch(next);
});

pinRouter.get('/api/pin/:id', function(req, res, next) {
  debug('GET: /api/pin/:id');

  Pin.findById(req.params.id)
  .then(pin => res.json(pin))
  .catch(next);
});

pinRouter.delete('/api/pin/:id', function(req, res, next) {
  debug('DELETE: /api/pin/:id');

  Pin.findByIdAndRemove(req.params.id)
  .then(() => res.status(204).send())
  .catch(next);
});
