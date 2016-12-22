'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const spiritAnimalRouter = require('./route/spiritAnimal-route.js');
const debug = require('debug')('spiritAnimal:server');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost/spiritAnimal';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(cors());
app.use(morgan('dev'));
app.use(spiritAnimalRouter);

app.listen(PORT, () => {
  debug(`server up: ${PORT}`);
});
