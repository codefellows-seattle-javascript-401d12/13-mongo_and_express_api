'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Board = require('../model/board.js');
const Pin = require('../model/pin.js');

const PORT = process.env.PORT || 3000;

require('../server.js');

const url = `http://localhost:${PORT}`;

const examplePin = {
  title: 'test pin title',
  skill: 'test pin skill'
};

const exampleBoard = {
  name: 'example board name',
  timestamp: new Date()
};

describe('Pin Routes', function() {
  describe('POST: /api/board/:boardID/pin', function() {
    describe('with a valid board id and pin body', () => {
      before(done => {
        new Board(exampleBoard).save()
        .then(board => {
          this.tempBoard = board;
          done();
        })
        .catch(done);
      });

      after(done => {
        Promise.all([
          Board.remove({}),
          Pin.remove({})
        ])
        .then(() => done())
        .catch(done);
      });

      it('should return a pin', done => {
        request.post(`${url}/api/board/${this.tempBoard.id}/pin`)
        .send(examplePin)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.title).to.equal(examplePin.title);
          expect(res.body.skill).to.equal(examplePin.skill);
          expect(res.body.boardID).to.equal(this.tempBoard._id.toString());
          done();
        });
      });
    });

    describe('with an invalid board id', function() {
      it('should return a 404 error', done => {
        request.post(`${url}/api/board/123456789/pin`)
        .end(res => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });
});
