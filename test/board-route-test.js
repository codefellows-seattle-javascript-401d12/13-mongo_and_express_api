'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Board = require('../model/board.js');

const PORT = process.env.PORT || 3000;

require('../server.js');

const url = `http://localhost:${PORT}`;

const exampleBoard = {
  name: 'test board',
  timestamp: new Date()
};

const examplePin = {
  title: 'test title',
  skill: 'test skill'
};

describe('Board Routes', function() {
  describe('POST: /api/board', function() {
    describe('with a valid body', function() {
      after(done => {
        if (this.tempBoard) {
          Board.remove({})
          .then(() => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a board', done => {
        request.post(`${url}/api/board`)
        .send(examplePin)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('test board');
          this.tempBoard = res.body;
          done();
        });
      });
    });
  });

  
});
