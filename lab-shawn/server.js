'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const debug = require('debug')('library:server');
const libraryRouter = require('./route/library-route.js');
const bookRouter = require('./route/book-route.js');
const errors = require('./lib/err-middleware.js');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/library';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(libraryRouter);
app.use(bookRouter);
app.use(errors);

app.listen(PORT, () => {
  debug(`served up: ${PORT}`);
});
