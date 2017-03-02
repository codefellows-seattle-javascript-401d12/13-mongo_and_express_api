'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('spiritAnimal:spiritAnimal-router');
const SpiritAnimal = require('../model/spiritAnimal.js');
const spiritAnimalRouter = module.exports = new Router();

spiritAnimalRouter.post('/api/spiritAnimal', jsonParser, function(req, res, next) {
  debug('POST: /api/spiritAnimal');

  req.body.spiritAnimalBirthday = new Date();
  new SpiritAnimal(req.body).save()
  .then( spiritAnimal => res.json(spiritAnimal))
  .catch(err => next(createError(404, err.message)));
});

spiritAnimalRouter.get('/api/spiritAnimal/:id', function(req, res, next) {
  debug('GET: /api/spiritAnimal/:id');

  SpiritAnimal.findById(req.params.id)
  .populate('pokemons')
  .then( spiritAnimal => res.json(spiritAnimal))
  .catch(err => next(createError(404, err.message)));
});

spiritAnimalRouter.put('/api/spiritAnimal/:id', jsonParser, function(req, res, next) {
  debug('PUT: /api/spiritAnimal/:id');

  SpiritAnimal.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(spiritAnimal => res.json(spiritAnimal))
  .catch(err => next(createError(404, err.message)));
});

spiritAnimalRouter.delete('/api/spiritAnimal/:id', function(req, res, next) {
  debug('DELETE: /api/spiritAnimal/:id');

  SpiritAnimal.findByIdAndRemove(req.params.id)
  .then(() => res.status(204).send())
  .catch(err => next(createError(404, err.message)));
});
