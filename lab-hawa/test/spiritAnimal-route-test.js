'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const SpiritAnimal = require('../model/spiritAnimal.js');
const PORT = process.env.PORT || 'mongodb://localhost/spiritAnimal';

require('../server.js');

const url = `http://localhost:${PORT}`;
const exampleSpiritAnimal = {
  spiritAnimalName: 'test spiritAnimal name'
};

describe('SpiritAnimal Routes', function() {
  describe('POST: /api/spiritAnimal', function () {
    describe('with a valid body', function() {
      after(done => {
        if(this.tempSpiritAnimal) {
          SpiritAnimal.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a spirit animal', done => {
        request.post(`${url}/api/spiritAnimal`)
        .send(exampleSpiritAnimal)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.spiritAnimalName).to.equal('test spiritAnimal name');
          this.tempSpiritAnimal = res.body;
          done();
        });
      });
    });
  });

  describe('GET: /api/spiritAnimal/:id', function() {
    describe('with a valid body', function () {
      before( done => {
        exampleSpiritAnimal.spiritAnimalBirthday = new Date();
        new SpiritAnimal(exampleSpiritAnimal).save()
        .then( spiritAnimal => {
          this.spiritAnimalBirthday = spiritAnimal;
          done();
        })
        .catch(done);
      });

      it('should return a spirit animal', done => {
        request.get(`${url}/api/spiritAnimal/${this.spiritAnimalBirthday._id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.spiritAnimalName).to.equal('test spiritAnimal name');
          done();
        });
      });
    });
  });
});
