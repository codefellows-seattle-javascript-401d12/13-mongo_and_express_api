'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Director = require('../model/directors.js');
const Movie = require('../model/movies.js');
const PORT = process.env.PORT || 3000;

const url = `http://localhost:${PORT}`;

const exampleDirector = {
  name: 'Example Director',
  timestamp: new Date()
};

const exampleMovie = {
  name: 'Example Movie',
  rating: 0
};

describe('Director Routes', function() {
  describe('POST: /api/director', function() {
    describe('Valid Body', function() {
      after( done => {
        if(this.tempDirector) {
          Director.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a director', done => {
        request.post(`${url}/api/director`)
          .send(exampleDirector)
          .end( (err, res) => {
            if(err) return done(err);
            expect(res.status).to.equal(200);
            this.tempDirector = res.body;
            done();
          });
      });
      it('should have a property of name', done => {
        expect(this.tempDirector).to.include.keys('name');
        expect(this.tempDirector).to.include.keys('movies');
        expect(this.tempDirector).to.include.keys('timestamp');
        expect(this.tempDirector).to.include.keys('_id');
        done();
      });
      it('name should be a string', done => {
        expect(this.tempDirector.name).to.be.a('string');
        done();
      });
      it('movies should be an array', done => {
        expect(this.tempDirector.movies).to.be.a('array');
        done();
      });
      it('timestamp should be a string', done => {
        expect(this.tempDirector.timestamp).to.be.a('string');
        done();
      });
    });
    describe('Invalid Body', function() {
      it('object missing name - should respond with validation error and status of 400', done => {
        request.post(`${url}/api/director`)
          .send({})
          .end( res => {
            expect(res.status).to.equal(400);
            done();
          });
      });
      it('malformed object - should respond with validation error and status 400', done => {
        request.post(`${url}/api/movies`)
          .send({name: 10})
          .end( res => {
            expect(res.status).to.equal(400);
            done();
          });
      });
    });
  });
  describe('POST: /api/director/:directorId/movie', function() {
    describe('Valid Body', function() {
      before( done => {
        new Director(exampleDirector).save()
          .then( director => {
            this.tempDirector = director;
            done();
          })
          .catch(done);
      });
      after( done => {
        if(this.tempDirector) {
          Director.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a movie', done => {
        request.post(`${url}/api/director/${this.tempDirector._id}/movie`)
          .send(exampleMovie)
          .end( (err, res) => {
            if(err) return done(err);
            expect(res.status).to.equal(200);
            this.tempMovie = res.body;
            done();
          });
      });
      it('should have properties of name, rating, timestamp, id, and directorID', done => {
        expect(this.tempMovie).to.include.keys('name');
        expect(this.tempMovie).to.include.keys('rating');
        expect(this.tempMovie).to.include.keys('timestamp');
        expect(this.tempMovie).to.include.keys('_id');
        expect(this.tempMovie).to.include.keys('directorID');
        done();
      });
      it('name should be a string', done => {
        expect(this.tempMovie.name).to.be.a('string');
        done();
      });
      it('rating should be a number', done => {
        expect(this.tempMovie.rating).to.be.a('number');
        done();
      });
      it('timestamp should be a string', done => {
        expect(this.tempMovie.timestamp).to.be.a('string');
        done();
      });
      it('directorId should equal tempDirector._id', done => {
        expect(this.tempMovie.directorID).to.equal(this.tempDirector._id.toString());
        done();
      });
    });
    describe('Invalid Body', function() {
      before( done => {
        new Director(exampleDirector).save()
          .then( director => {
            this.tempDirector = director;
            done();
          })
          .catch(done);
      });
      after( done => {
        if(this.tempDirector) {
          Director.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });

      it('object missing name - should respond with validation error and status of 400', done => {
        request.post(`${url}/api/director/${this.tempDirector._id}/movie`)
          .send({rating: 5})
          .end( res => {
            expect(res.status).to.equal(400);
            done();
          });
      });
      it('object missing rating - should respond with validation error and status of 400', done => {
        request.post(`${url}/api/director/${this.tempDirector._id}/movie`)
          .send({name: 'Should fail'})
          .end( res => {
            expect(res.status).to.equal(400);
            done();
          });
      });
      it('malformed object - should respond with validation error and status 400', done => {
        request.post(`${url}/api/director/${this.tempDirector._id}/movie`)
          .send({name: 5, rating:'ten'})
          .end( res => {
            expect(res.status).to.equal(400);
            done();
          });
      });
    });
  });
  describe('GET: /api/director/:id', function() {
    describe('Valid Request', function() {
      before( done => {
        new Director(exampleDirector).save()
          .then( director => {
            this.tempDirector = director;
            done();
          })
          .catch(done);
      });
      after( done => {
        if(this.tempDirector) {
          Director.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should respond with a status of 200', done => {
        request.get(`${url}/api/director/${this.tempDirector._id}`)
          .end( (err, res) => {
            if(err) return done(err);
            expect(res.status).to.equal(200);
            done();
          });
      });
      it('should have properties of name and rating', done => {
        request.get(`${url}/api/director/${this.tempDirector._id}`)
          .end( (err, res) => {
            if(err) return done(err);
            expect(res.body).to.include.keys('name');
            expect(res.body).to.include.keys('movies');
            expect(res.body).to.include.keys('timestamp');
            expect(res.body).to.include.keys('_id');
            done();
          });
      });
      it('rating should be a number and name a string', done => {
        expect(this.tempDirector.name).to.be.a('string');
        done();
      });
      it('rating and number values should equal exampleDirector object', done => {
        request.get(`${url}/api/director/${this.tempDirector._id}`)
          .end( (err, res) => {
            expect(res.body.name).to.equal(exampleDirector.name);
            done();
          });
      });
    });
    describe('Invalid Request', function() {
      it('should respond with an error', done => {
        request.get(`${url}/api/director/123456789`)
          .end( res => {
            expect(res.status).to.equal(404);
            done();
          });
      });
    });
  });

  describe('PUT: /api/director/:id', function() {
    describe('Valid Body', function() {
      before( done => {
        new Director(exampleDirector).save()
          .then( director => {
            this.tempDirector = director;
            done();
          })
          .catch(done);
      });
      after( done => {
        if(this.tempDirector) {
          Director.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should respond with a status of 200', done => {
        request.put(`${url}/api/director/${this.tempDirector._id}`)
          .send({name: 'New Name'})
          .end( (err, res) => {
            if(err) return done(err);
            expect(res.status).to.equal(200);
            this.tempDirector = res.body;
            done();
          });
      });
      it('should have properties of name and rating', done => {
        expect(this.tempDirector).to.include.keys('name');
        expect(this.tempDirector).to.include.keys('name');
        expect(this.tempDirector).to.include.keys('movies');
        expect(this.tempDirector).to.include.keys('timestamp');
        expect(this.tempDirector).to.include.keys('_id');
        done();
      });
      it('should have update name property', done => {
        expect(this.tempDirector.name).to.equal('New Name');
        done();
      });
    });
    describe('Invalid Body', function() {
      it('should respond with a status of 404', done => {
        request.put(`${url}/api/director/123456789`)
          .end( (res) => {
            expect(res.status).to.equal(404);
            done();
          });
      });
    });
  });

  describe('DELETE: /api/director/:id', function() {
    describe('Valid Body', function() {
      before( done => {
        new Director(exampleDirector).save()
          .then( director => {
            this.tempDirector = director;
            done();
          })
          .catch(done);
      });

      it('should respond with status 204', done => {
        request.delete(`${url}/api/director/${this.tempDirector._id}`)
          .end( (err, res) => {
            if(err) return done(err);
            expect(res.status).to.equal(204);
            done();
          });
      });
    });
    describe('Invalid Body', function() {
      it('should respond with status 404', done => {
        request.delete(`${url}/api/director/123456789`)
          .end( res => {
            expect(res.status).to.equal(404);
            done();
          });
      });
    });
  });
});
