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
