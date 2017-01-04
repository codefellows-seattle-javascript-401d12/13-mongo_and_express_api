'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const List = require('../model/bev.js');

const PORT = process.env.PORT || 3000;

require('../server.js');

const url = `http://localhost:${PORT}`;

const exampleVehicle = {
  vehicle: 'test vehicle',
  info: 'test info',
  msrp: 35000,
  range: 200,
  mpge: 100,
  lastupdated: new Date(),
};

describe('BEV routes', function() {
  // TODO: build out tests
});
