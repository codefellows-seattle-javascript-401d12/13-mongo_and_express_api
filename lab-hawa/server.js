'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const debug = require('debug')('spiritAnimal:server');

const spiritAnimalRouter = require('./route/spiritAnimal-route.js');
const pokemonRouter = require('./route/pokemon-route.js');

const MONGODB_URI = 'mongodb://localhost/spiritAnimal';
const PORT = process.env.PORT || 3000;

mongoose.connect(MONGODB_URI);
mongoose.Promise = Promise;

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(spiritAnimalRouter);
app.use(pokemonRouter);

app.listen(PORT, () => {
  console.error(`server up: ${PORT}`);
});
