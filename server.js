'use strict';

const express = require('express');
const debug = require('debug')('movies:server');
const morgan = require('morgan');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.listen(PORT , () => {
  debug(`Server Up: ${PORT}`);
});
