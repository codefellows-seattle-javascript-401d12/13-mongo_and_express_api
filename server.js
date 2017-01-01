'use strict';


const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Promise = require('bluebird');
const debug = require('debug')('list:server');
const mongoose = require('mongoose');

const route = require('./route/route-list.js');

const PORT = 3000;
const MONGODB_URI = 'mongodb://localhost/list';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(route);


app.listen(PORT, () => {
  debug(`server up: ${PORT}`);
});
