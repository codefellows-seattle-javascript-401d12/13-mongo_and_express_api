'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const debug = require('debug')('bev:server');

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  debug(`SERVER RUNNING ON PORT ${PORT}`);
});
