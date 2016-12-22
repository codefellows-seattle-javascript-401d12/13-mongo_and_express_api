'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spiritAnimalSchema = Schema({
  spiritAnimalName: { type: String, required: true },
  spiritAnimalBirthday: { type: Date, required: true }
});

module.exports = mongoose.model('spiritAnimal', spiritAnimalSchema);
