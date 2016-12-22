'use strict';

const express = require('express');
const debug = require('debug')('student:server');
const cors = require('cors');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const studentRouter = require('./route/student-route.js');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/listdev';

app.use(morgan('dev'));
app.use(cors());
app.use(studentRouter);

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.listen(PORT, () => {
  debug(`Server started on port ${PORT}.`);
});
