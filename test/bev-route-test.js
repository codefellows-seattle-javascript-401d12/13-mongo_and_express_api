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
  describe('POST: /api/bev', function() {
    describe('with a valid body', function() {
      after( done => {
        if (this.tempVehicle) {
          BEV.remove({})
          .then( () => done())
          .catch(done);
          return;
        };
        done();
      });

      it('should return data for a vehicle', done => {
        request.post(`${url}/api/bev`)
        .send(exampleVehicle)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.vehicle).to.equal('test vehicle');
          done();
        });
      });
    });
  });

  describe('GET: /api/bev/:id', function() {
    describe('with a valid body', function() {
      // TODO: build out GET test
    });
  });

  describe('PUT: /api/bev/:id', function() {
    describe('with a valid body', function() {
      // TODO: build out PUT test
    });
  });

  describe('DELETE: /api/bev/:id', function() {
    describe('with a valid body', function() {
      // TODO: build out DELETE test
    });
  });
});
