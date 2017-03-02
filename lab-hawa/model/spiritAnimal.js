'use strict';

const mongoose = require('mongoose');
const createError = require('http-errors');
const debug = require('debug')('spiritAnimal:spiritAnimal');
const Schema = mongoose.Schema;

const Pokemon = require('./pokemon.js');

const spiritAnimalSchema = Schema({
  spiritAnimalName: { type: String, required: true },
  spiritAnimalBirthday: { type: Date, default: Date.now },
  pokemons: [{type: Schema.Types.ObjectId, ref: 'pokemon'}]
});

const SpiritAnimal = module.exports = mongoose.model('spiritAnimal', spiritAnimalSchema);


SpiritAnimal.findByIdAndAddPokemon = function(id, pokemon) {
  debug('findByIdAndAddPokemon');

  return SpiritAnimal.findById(id)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(spiritAnimal => {
    pokemon.spiritAnimalID = spiritAnimal._id;
    this.tempSpiritAnimal = spiritAnimal;
    return new Pokemon(pokemon).save();
  })
  .then(pokemon => {
    this.tempSpiritAnimal.pokemons.push(pokemon._id);
    this.tempPokemon = pokemon;
    return this.tempSpiritAnimal.save();
  })
  .then(() => {
    return this.tempPokemon;
  });
};
