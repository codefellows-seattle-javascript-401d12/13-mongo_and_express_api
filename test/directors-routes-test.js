'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Director = require('../model/directors.js');
const Movie = require('../model/movies.js');
const PORT = process.env.PORT || 3000;

require('../server.js');

const url = `http://localhost:${PORT}`;

const exampleDirector = {
  name: 'Steven Spielberg',
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
    });
  });
});
