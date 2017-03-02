'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const SpiritAnimal = require('../model/spiritAnimal.js');
const Pokemon = require('../model/pokemon.js');
const createError = require('http-errors');
const debug = require('debug')('spiritAnimal:pokemon-route');

const pokemonRouter = module.exports = new Router();

// pokemonRouter.post('/api/pokemon', jsonParser, function(req, res, next) {
//   debug('POST: /api/pokemon');
//
//   new Pokemon(req.body).save()
//     .then( pokemon => {
//       debug('then - pokemonRouter.post - 1st');
//
//       res.json(pokemon);
//     })
//     .catch(err => next(createError(404, err.message)));
// });

pokemonRouter.post('/api/spiritAnimal/:spiritAnimalID/pokemon', jsonParser, function(req, res, next) {
  debug('POST: /api/spiritAnimal/:spiritAnimalID/pokemon');

  SpiritAnimal.findByIdAndAddPokemon(req.params.spiritAnimalID, req.body)
  .then(pokemon => res.json(pokemon))
  .catch(err => next(createError(404, err.message)));
});

pokemonRouter.get('/api/pokemon/:id', function(req, res, next) {
  debug('GET: /api/pokemon/:id');

  Pokemon.findById(req.params.id)
  .then(pokemon => res.json(pokemon))
  .catch(err => next(createError(404, err.message)));
});

pokemonRouter.put('/api/pokemon/:id', jsonParser, function(req, res, next) {
  debug('PUT: /api/pokemon/:id');

  req.body.spiritAnimalBirthday = new Date();
  Pokemon.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(pokemon => res.json(pokemon))
  .catch(err => next(createError(404, err.message)));
});

pokemonRouter.delete('/api/pokemon/:id', function(req, res, next) {
  debug('DELETE: /api/pokemon/:id');

  Pokemon.findByIdAndRemove(req.params.id)
  .then(() => res.status(204).send())
  .catch(err => next(createError(404, err.message)));
});
