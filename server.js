'use strict';

const express = require('express');
const debug = require('debug')('movies:server');
const morgan = require('morgan');
const cors = require('cors');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const movieRouter = require('./routes/movies-routes.js');
//TODO: Require in error middleware

const PORT = process.env.PORT || 3000;
const app = express();

const MONGODB_URI =  process.env.MONGO_LIST_URI_ACCESS || 'mongodb://localhost/movies';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(cors());
app.use(morgan('dev'));
app.use(movieRouter);
//TODO: add app.use(error-middlware)

app.listen(PORT , () => {
  debug(`Server Up: ${PORT}`);
});
