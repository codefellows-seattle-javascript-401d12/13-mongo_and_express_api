'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Movies = require('../model/movies.js');
const PORT = process.env.PORT || 3000;

require('../server.js');

const url = `http://localhost:${PORT}`;

const exampleMovie = {
  name: 'Example Movie',
  rating: 0
};

describe('Movie Routes', function() {
  describe('POST: /api/movies', function() {
    describe('Valid Body', function() {
      after( done => {
        if(this.tempMovie) {
          Movies.findByIdAndRemove(this.tempMovie._id)
            .then( () => done())
            .catch(done);
          return;
        }
        done();
      });
      it('should respond with a status of 200', done => {
        request.post(`${url}/api/movies`)
          .send(exampleMovie)
          .end((err, res) => {
            if(err) return done(err);
            expect(res.status).to.equal(200);
            this.tempMovie = res.body;
            done();
          });
      });
      it('should have properties of name and rating', done => {
        expect(this.tempMovie).to.include.keys('name');
        expect(this.tempMovie).to.include.keys('rating');
        done();
      });
      it('rating should be a number and name a string', done => {
        expect(this.tempMovie.name).to.be.a('string');
        expect(this.tempMovie.rating).to.be.a('number');
        done();
      });
    });
    describe('Invalid Body', function() {
      it('object missing name - should respond with validation error and status of 500', done => {
        request.post(`${url}/api/movies`)
          .send({rating: 5})
          .end( res => {
            expect(res.status).to.equal(400);
            done();
          });
      });
      it('object missing rating - should respond with validation error and status of 500', done => {
        request.post(`${url}/api/movies`)
          .send({name: 'Should fail'})
          .end( res => {
            expect(res.status).to.equal(400);
            done();
          });
      });
      it('malformed object - should respond with validation error and status 500', done => {
        request.post(`${url}/api/movies`)
          .send({name: 5, rating:'ten'})
          .end( res => {
            expect(res.status).to.equal(400);
            done();
          });
      });
    });
  });

  describe('GET: /api/movies/:id', function() {
    describe('Valid Request', function() {
      before( done => {
        exampleMovie.timestamp = new Date();
        new Movies(exampleMovie).save()
          .then( movie => {
            this.tempMovie = movie;
            done();
          })
          .catch(done);
      });
      after( done => {
        if(this.tempMovie) {
          Movies.findByIdAndRemove(this.tempMovie._id)
            .then( () => done())
            .catch(done);
          return;
        }
        done();
      });
      it('should respond with a status of 200', done => {
        request.get(`${url}/api/movies/${this.tempMovie._id}`)
          .end( (err, res) => {
            if(err) return done(err);
            expect(res.status).to.equal(200);
            done();
          });
      });
      it('should have properties of name and rating', done => {
        request.get(`${url}/api/movies/${this.tempMovie._id}`)
          .end( (err, res) => {
            if(err) return done(err);
            expect(res.body).to.include.keys('name');
            expect(res.body).to.include.keys('rating');
            done();
          });
      });
      it('rating should be a number and name a string', done => {
        expect(this.tempMovie.name).to.be.a('string');
        expect(this.tempMovie.rating).to.be.a('number');
        done();
      });
      it('rating and number values should equal exampleMovie object', done => {
        request.get(`${url}/api/movies/${this.tempMovie._id}`)
          .end( (err, res) => {
            expect(res.body.name).to.equal(exampleMovie.name);
            expect(res.body.rating).to.equal(exampleMovie.rating);
            done();
          });
      });
    });
    describe('Invalid Request', function() {
      it('should respond with an error', done => {
        request.get(`${url}/api/movies/123456789`)
          .end( res => {
            expect(res.status).to.equal(404);
            done();
          });
      });
    });
  });

  describe('PUT: /api/movies/:id', function() {
    describe('Valid Body', function() {
      before( done => {
        exampleMovie.timestamp = new Date();
        new Movies(exampleMovie).save()
          .then( movie => {
            this.tempMovie = movie;
            done();
          })
          .catch(done);
      });
      after( done => {
        if(this.tempMovie) {
          Movies.findByIdAndRemove(this.tempMovie._id)
            .then( () => done())
            .catch(done);
          return;
        }
        done();
      });
      it('should respond with a status of 200', done => {
        request.put(`${url}/api/movies/${this.tempMovie._id}`)
          .send({name: 'New Name'})
          .end( (err, res) => {
            if(err) return done(err);
            expect(res.status).to.equal(200);
            this.tempMovie = res.body;
            done();
          });
      });
      it('should have properties of name and rating', done => {
        expect(this.tempMovie).to.include.keys('name');
        expect(this.tempMovie).to.include.keys('rating');
        done();
      });
      it('should have update name property and unmodified rating property', done => {
        expect(this.tempMovie.name).to.equal('New Name');
        expect(this.tempMovie.rating).to.equal(exampleMovie.rating);
        done();
      });
      it('should respond with a status of 200', done => {
        request.put(`${url}/api/movies/${this.tempMovie._id}`)
          .send({rating: 5})
          .end( (err, res) => {
            if(err) return done(err);
            expect(res.status).to.equal(200);
            this.tempMovie = res.body;
            done();
          });
      });
      it('should have update name property and updated rating property', done => {
        expect(this.tempMovie.name).to.equal('New Name');
        expect(this.tempMovie.rating).to.equal(5);
        done();
      });
    });
    describe('Invalid Body', function() {
      it('should respond with a status of 500', done => {
        request.put(`${url}/api/movies/123456789`)
          .end( (res) => {
            expect(res.status).to.equal(404);
            done();
          });
      });
    });
  });
  describe('DELETE: /api/movies/:id', function() {
    describe('Valid Body', function() {
      before( done => {
        exampleMovie.timestamp = new Date();
        new Movies(exampleMovie).save()
          .then( movie => {
            this.tempMovie = movie;
            done();
          })
          .catch(done);
      });
      it('should respond with status 204', done => {
        request.delete(`${url}/api/movies/${this.tempMovie._id}`)
          .end( (err, res) => {
            if(err) return done(err);
            expect(res.status).to.equal(204);
            done();
          });
      });
    });
    describe('Invalid Body', function() {
      it('should respond with status 500', done => {
        request.delete(`${url}/api/movies/123456789`)
          .end( res => {
            expect(res.status).to.equal(404);
            done();
          });
      });
    });
  });
});
