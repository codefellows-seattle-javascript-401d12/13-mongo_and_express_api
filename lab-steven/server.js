'use strict';

const express = require('express');
const debug = require('debug')('student:server');
const app = express();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  debug(`Server started on port ${PORT}.`);
});
