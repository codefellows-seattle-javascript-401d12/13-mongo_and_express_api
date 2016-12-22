'use strict';

const express = require('express');
const debug = require('debug')('movies:server');
const morgan = require('morgan');
//TODO: require in cors, bluebird, mongoose, movies router

const PORT = process.env.PORT || 3000;
const app = express();

//TODO: create const for mongoose URI  ***  mongoListURI

//TODO: promiseify mongoose and connect mongoose

//TODO: add middleware cors
app.use(morgan('dev'));
//TODO: add middleware router

app.listen(PORT , () => {
  debug(`Server Up: ${PORT}`);
});
