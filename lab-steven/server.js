'use strict';

const express = require('express');
const debug = require('debug')('student:server');
const cors = require('cors');
const studentRouter = require('./route/student-route.js');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(morgan('dev'));
app.use(cors());
app.use(studentRouter);

app.listen(PORT, () => {
  debug(`Server started on port ${PORT}.`);
});
