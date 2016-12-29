'use strict';


const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Promise = require('bluebird');
const debug = require('debug')('list:server');
const mongoose = require('mongoose');

const route = require('./route/route-list.js');

const app = express();
const PORT = 3000;
const MONGODB_URI = 'mongodb://localhost/list';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(morgan('dev'));
app.use(cors());
app.use(route);


app.listen(PORT, () => {
  debug(`server up: ${PORT}`);
});
