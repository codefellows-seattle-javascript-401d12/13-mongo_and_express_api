'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const debug = require('debug')('bev:server');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost/bev';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.listen(PORT, () => {
  debug(`SERVER RUNNING ON PORT ${PORT}`);
});
