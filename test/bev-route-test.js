'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const BEV = require('../model/bev.js');

const PORT = process.env.PORT || 3000;

require('../server.js');

const url = `http://localhost:${PORT}`;

const exampleVehicle = {
  vehicle: 'test vehicle',
  info: 'test info',
  msrp: 35000,
  range: 200,
  mpge: 100,
  lastupdated: new Date()
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

    describe('with no content in the request body', function() {
      it('should return a 400 \'bad request\' status', done => {
        request.post(`${url}/api/bev`)
        .send()
        .end((err, res) => {
          expect(err.status).to.equal(400);
          expect(res.status).to.equal(400);
          expect(res.res.statusMessage).to.equal('Bad Request');
          done();
        })
      })
    })

    describe('with required fields missing', function() {
      var badExampleVehicle = {
        vehicle: 'bad test vehicle',
        info: 'bad test info',
      };

      it('should return a 400 \'bad request\' status', done => {
        request.post(`${url}/api/bev`)
        .send(badExampleVehicle)
        .end((err, res) => {
          expect(err.status).to.equal(400);
          expect(res.status).to.equal(400);
          expect(res.res.statusMessage).to.equal('Bad Request');
          done();
        })
      })
    })
  });

  describe('GET: /api/bev/:id', function() {
    describe('with a valid body', function() {
      before( done => {
        exampleVehicle.lastupdated = new Date();
        new BEV(exampleVehicle).save()
        .then( vehicle => {
          this.tempVehicle = vehicle;
          done();
        })
        .catch(done);
      });

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
        request.get(`${url}/api/bev/${this.tempVehicle._id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.vehicle).to.equal('test vehicle');
          expect(res.body.msrp).to.be.a('number');
          expect(res.body.lastupdated.split('-')[0]).to.equal(new Date().getFullYear().toString());
          done();
        });
      });
    });

    describe('to an invalid id', function() {
      it('should return a 404 \'not found\' status', done => {
        request.get(`${url}/api/bev/invalid-id`)
        .end((err, res) => {
          expect(err.status).to.equal(404);
          expect(res.status).to.equal(404);
          expect(res.res.statusMessage).to.equal('Not Found');
          done();
        })
      })
    })
  });

  describe('GET: /api/bev/', function() {
    describe('with a valid request and data existing in the database', function() {
      before( done => {
        exampleVehicle.lastupdated = new Date();
        new BEV(exampleVehicle).save()
        .then( vehicle => {
          this.tempVehicle = vehicle;
          done();
        })
        .catch(done);
      });

      after( done => {
        if (this.tempVehicle) {
          BEV.remove({})
          .then( () => done())
          .catch(done);
          return;
        };
        done();
      });

      it('should return an array of ids', done => {
        request.get(`${url}/api/bev`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.include(this.tempVehicle._id.toString());
          done();
        })
      })
    });
  });

  describe('PUT: /api/bev/:id', function() {
    describe('with a valid body', function() {
      before( done => {
        exampleVehicle.lastupdated = new Date();
        new BEV(exampleVehicle).save()
        .then( vehicle => {
          this.tempVehicle = vehicle;
          done();
        })
        .catch(done);
      });

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
        var updatedVehicle = {
          vehicle: 'updated vehicle',
          info: 'updated info',
          lastupdated: new Date()
        };

        request.put(`${url}/api/bev/${this.tempVehicle._id}`)
        .send(updatedVehicle)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.vehicle).to.equal(updatedVehicle.vehicle);
          // expect the two timestamps to differ by a few milliseconds
          expect(res.body.lastupdated).to.not.equal(exampleVehicle.lastupdated.toISOString());
          // aside from milliseconds section, expect the two timestamps to be identical
          expect(res.body.lastupdated.split(':')[0]).to.equal(exampleVehicle.lastupdated.toISOString().split(':')[0]);
          done();
        });
      });
    });

    describe('with no content in the request body', function() {
      before( done => {
        exampleVehicle.lastupdated = new Date();
        new BEV(exampleVehicle).save()
        .then( vehicle => {
          this.tempVehicle = vehicle;
          done();
        })
        .catch(done);
      });

      after( done => {
        if (this.tempVehicle) {
          BEV.remove({})
          .then( () => done())
          .catch(done);
          return;
        };
        done();
      });

      it('should return a 400 \'bad request\' status', done => {
        request.put(`${url}/api/bev/${this.tempVehicle._id}`)
        .send()
        .end((err, res) => {
          expect(err.status).to.equal(400);
          expect(res.status).to.equal(400);
          expect(res.res.statusMessage).to.equal('Bad Request');
          done();
        });
      });
    });

    describe('to an invalid id', function() {
      it('should return a 404 \'not found\' status', done => {
        var updatedVehicle = {
          vehicle: 'updated vehicle',
          info: 'updated info',
          lastupdated: new Date()
        };

        request.put(`${url}/api/bev/invalid-id`)
        .send(updatedVehicle)
        .end((err, res) => {
          expect(err.status).to.equal(404);
          expect(res.status).to.equal(404);
          expect(res.res.statusMessage).to.equal('Not Found');
          done();
        });
      });
    });
  });

  describe('DELETE: /api/bev/:id', function() {
    describe('to a valid id', function() {
      before( done => {
        exampleVehicle.lastupdated = new Date();
        new BEV(exampleVehicle).save()
        .then( vehicle => {
          this.tempVehicle = vehicle;
          done();
        })
        .catch(done);
      });

      it('should return a 204 \'no content\' status', done => {
        request.delete(`${url}/api/bev/${this.tempVehicle._id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(204);
          expect(res.res.statusMessage).to.equal('No Content');
          expect(res.body).to.be.an('object');
          expect(res.body).to.be.empty;
          done();
        });
      });
    });
  });
});
