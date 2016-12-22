'use strict';

const Router = require('express');
const jsonParser = require('body-parser').json();
const SpiritAnimal = require('../model/spiritAnimal.js');
const debug = require('debug')('spiritAnimal:spiritAnimal-router');
const spiritAnimalRouter = module.exports = new Router();

spiritAnimalRouter.post('/api/spiritAnimal', jsonParser, function(req, res, next) {
  debug('POST: /api/spiritAnimal');

  req.body.spiritAnimalBirthday = new Date();
  new SpiritAnimal(req.body).save()
  .then( spiritAnimal => res.json(spiritAnimal))
  .catch(next);
});

spiritAnimalRouter.get('/api/spiritAnimal/:id', function(req, res, next) {
  debug('GET: /api/spiritAnimal/:id');

  SpiritAnimal.findById(req.params.id)
  .then( spiritAnimal => res.json(spiritAnimal))
  .catch(next);
});
