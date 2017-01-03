'use strict';

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const Promise = require('bluebird');
const debug = require('debug')('pin:server');

const boardRouter = require('./route/board-route.js');
const pinRouter = require('./route/pin-route.js');
const errors = require('./lib/error-middleware.js');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/pin';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

const app = express();
app.use(cors());
app.use(morgan('dev'));

app.use(boardRouter);
app.use(pinRouter);
app.use(errors);

app.listen(PORT, () => {
  debug(`server running: ${PORT}`);
});
