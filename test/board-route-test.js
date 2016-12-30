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

    describe('with an invalid body', function() {
      it('should return a 400 error', done => {
        request.post(`${url}/api/board`)
        .send({})
        .end(res => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });

  describe('GET: /api/board/:id', function() {
    describe('with a valid body', function() {
      before(done => {
        new Board(exampleBoard).save()
        .then(board => {
          this.tempBoard = board;
          return Board.findByIdAndAddPin(board._id, examplePin);
        })
        .then(pin => {
          this.tempPin = pin;
          done();
        })
        .catch(done);
      });

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
        request.get(`${url}/api/board/${this.tempBoard._id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('test board');
          expect(res.body.pins.length).to.equal(1);
          expect(res.body.pin[0].title).to.equal(examplePin.title);
          expect(res.body.pin[0].skill).to.equal(examplePin.skill);
          done();
        });
      });
    });

    describe('with an invalid request', function() {
      it('should return a 404 error', done => {
        request.get(`${url}/api/board/3988794549`)
        .end(res => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe('PUT: /api/board/id')
});
