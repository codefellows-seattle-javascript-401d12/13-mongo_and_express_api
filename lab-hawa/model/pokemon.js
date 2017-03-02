'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pokemonSchema = Schema({
  pokemonName: { type: String, required: true },
  skill: { type: String, required: true },
  spiritAnimalID: { type: Schema.Types.ObjectId, required: true }
});

module.exports = mongoose.model('pokemon', pokemonSchema);
