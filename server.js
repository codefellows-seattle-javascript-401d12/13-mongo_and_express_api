'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const debug = require('debug')('bev:server');

const bevRouter = require('./route/bev-route.js');
const reviewRouter = require('./route/review-route.js');
const errors = require('./lib/error-middleware.js');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost/bev';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(cors());
app.use(morgan('dev'));
app.use(bevRouter);
app.use(reviewRouter);
app.use(errors);

app.listen(PORT, () => {
  debug(`SERVER RUNNING ON PORT ${PORT}`);
});
