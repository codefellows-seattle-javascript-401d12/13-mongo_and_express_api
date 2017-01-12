'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const BEV = require('../model/bev.js');
const Review = require('../model/review.js');

const PORT = process.env.PORT || 3000;

require('../server.js');

const url = `http://localhost:${PORT}`;

const exampleReview = {
  title: 'test review',
  authorName: 'Joe',
  reviewText: 'test review text',
  rating: 8,
};

const updatedReview = {
  title: 'revised test review',
  reviewText: 'revised test review text',
  rating: 10,
};

const invalidExampleReview = {
  title: 'test review',
  authorName: 'Joe',
  reviewText: 'test review text',
  // non-integer rating value will throw validation error
  rating: 3.5,
};

const exampleVehicle = {
  vehicle: 'test vehicle',
  info: 'test info',
  msrp: 35000,
  range: 200,
  mpge: 100,
  lastupdated: new Date()
};


describe('Review Routes', function() {
  describe('POST: /api/bev/:vehicleID/review', function() {
    describe('with a valid \'vehicle\' object and body', () => {
      before( done => {
        new BEV(exampleVehicle).save()
        .then( vehicle => {
          this.tempVehicle = vehicle;
          done();
        })
        .catch(done);
      });

      after( done => {
        Promise.all([
          BEV.remove({}),
          Review.remove({})
        ])
        .then( () => done())
        .catch(done);
      });

      it('should return data for a vehicle', done => {
        request.post(`${url}/api/bev/${this.tempVehicle._id}/review`)
        .send(exampleReview)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(exampleReview.name);
          expect(res.body.vehicleID).to.equal(this.tempVehicle._id.toString());
          done();
        });
      });
    });

    describe('with a valid \'vehicle\' object and an invalid body', function() {
      before( done => {
        new BEV(exampleVehicle).save()
        .then( vehicle => {
          this.tempVehicle = vehicle;
          done();
        })
        .catch(done);
      });

      after( done => {
        Promise.all([
          BEV.remove({}),
          Review.remove({})
        ])
        .then( () => done())
        .catch(done);
      });

      it('should return a 400 \'bad request\' status', done => {
        request.post(`${url}/api/bev/${this.tempVehicle._id}/review`)
        .send(invalidExampleReview)
        .end((err, res) => {
          expect(err.status).to.equal(400);
          expect(res.status).to.equal(400);
          expect(res.res.statusMessage).to.equal('Bad Request');
          done();
        });
      });
    });
  });

  describe('GET: /api/bev/:vehicleID/review/:id', function() {
    describe('with a valid body', function() {
      before( done => {
        new BEV(exampleVehicle).save()
        .then( vehicle => {
          this.tempVehicle = vehicle;
          return BEV.findByIdAndAddReview(vehicle._id, exampleReview);
        })
        .then( review => {
          this.tempReview = review;
          done();
        })
        .catch(done);
      });

      after( done => {
        Promise.all([
          BEV.remove({}),
          Review.remove({})
        ])
        .then( () => done())
        .catch(done);
      });

      it('should return a review', done => {
        request.get(`${url}/api/bev/${this.tempVehicle._id}/review/${this.tempReview._id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body._id).to.equal(this.tempReview._id.toString());
          expect(res.body.vehicleID).to.equal(this.tempVehicle._id.toString());
          expect(res.body.authorName).to.equal('Joe');
          done();
        });
      });
    });

    describe('with a valid vehicle id and an invalid review id', function() {
      before( done => {
        new BEV(exampleVehicle).save()
        .then( vehicle => {
          this.tempVehicle = vehicle;
          return BEV.findByIdAndAddReview(vehicle._id, exampleReview);
        })
        .then( review => {
          this.tempReview = review;
          done();
        })
        .catch(done);
      });

      after( done => {
        Promise.all([
          BEV.remove({}),
          Review.remove({})
        ])
        .then( () => done())
        .catch(done);
      });

      it('should return a 404 \'not found\' status', done => {
        request.get(`${url}/api/bev/${this.tempVehicle._id}/review/${this.tempVehicle._id}`)
        .end((err, res) => {
          expect(err.status).to.equal(404);
          expect(res.status).to.equal(404);
          expect(res.res.statusMessage).to.equal('Not Found');
          done();
        });
      });
    });
  });

  describe('PUT: /api/bev/:vehicleID/review/:id', function() {
    describe('with a valid body', function() {
      before( done => {
        new BEV(exampleVehicle).save()
        .then( vehicle => {
          this.tempVehicle = vehicle;
          return BEV.findByIdAndAddReview(vehicle._id, exampleReview);
        })
        .then( review => {
          this.tempReview = review;
          done();
        })
        .catch(done);
      });

      after( done => {
        Promise.all([
          BEV.remove({}),
          Review.remove({})
        ])
        .then( () => done())
        .catch(done);
      });

      it('should return a review', done => {

        request.put(`${url}/api/bev/${this.tempVehicle._id}/review/${this.tempReview._id}`)
        .send(updatedReview)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body._id).to.equal(this.tempReview._id.toString());
          expect(res.body.reviewText).to.equal('revised test review text');
          done();
        })
      });
    });

    describe('with no content in the request body', function() {
      before( done => {
        new BEV(exampleVehicle).save()
        .then( vehicle => {
          this.tempVehicle = vehicle;
          return BEV.findByIdAndAddReview(vehicle._id, exampleReview);
        })
        .then( review => {
          this.tempReview = review;
          done();
        })
        .catch(done);
      });

      after( done => {
        Promise.all([
          BEV.remove({}),
          Review.remove({})
        ])
        .then( () => done())
        .catch(done);
      });

      it('should return a 400 \'bad request\' status', done => {

        request.put(`${url}/api/bev/${this.tempVehicle._id}/review/${this.tempReview._id}`)
        .send()
        .end((err, res) => {
          expect(err.status).to.equal(400);
          expect(res.status).to.equal(400);
          expect(res.res.statusMessage).to.equal('Bad Request');
          done();
        })
      });
    });

    describe('to an invalid id', function() {
      before( done => {
        new BEV(exampleVehicle).save()
        .then( vehicle => {
          this.tempVehicle = vehicle;
          return BEV.findByIdAndAddReview(vehicle._id, exampleReview);
        })
        .then( review => {
          this.tempReview = review;
          done();
        })
        .catch(done);
      });

      after( done => {
        Promise.all([
          BEV.remove({}),
          Review.remove({})
        ])
        .then( () => done())
        .catch(done);
      });

      it('should return a 404 \'not found\' status', done => {

        request.put(`${url}/api/bev/${this.tempVehicle._id}/review/${this.tempVehicle._id}`)
        .send(updatedReview)
        .end((err, res) => {
          expect(err.status).to.equal(404);
          expect(res.status).to.equal(404);
          expect(res.res.statusMessage).to.equal('Not Found');
          done();
        })
      });
    });
  });

  describe('DELETE: /api/bev/:vehicleID/review/:id', function() {
    describe('to a valid id', function() {
      before( done => {
        new BEV(exampleVehicle).save()
        .then( vehicle => {
          this.tempVehicle = vehicle;
          return BEV.findByIdAndAddReview(vehicle._id, exampleReview);
        })
        .then( review => {
          this.tempReview = review;
          done();
        })
        .catch(done);
      });

      after( done => {
        Promise.all([
          BEV.remove({}),
          Review.remove({})
        ])
        .then( () => done())
        .catch(done);
      });

      it('should return a 204 \'no content\' status', done => {
        request.delete(`${url}/api/bev/${this.tempVehicle._id}/review/${this.tempReview._id}`)
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

    describe('to an invalid id', function() {
      before( done => {
        new BEV(exampleVehicle).save()
        .then( vehicle => {
          this.tempVehicle = vehicle;
          return BEV.findByIdAndAddReview(vehicle._id, exampleReview);
        })
        .then( review => {
          this.tempReview = review;
          done();
        })
        .catch(done);
      });

      after( done => {
        Promise.all([
          BEV.remove({}),
          Review.remove({})
        ])
        .then( () => done())
        .catch(done);
      });

      it('should return a 404 \'not found\' status', done => {
        request.delete(`${url}/api/bev/${this.tempVehicle._id}/review/${this.tempVehicle._id}`)
        .end((err, res) => {
          expect(err.status).to.equal(404);
          expect(res.status).to.equal(404);
          expect(res.res.statusMessage).to.equal('Not Found');
          done();
        });
      });
    });
  });
});
