'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const SpiritAnimal = require('../model/spiritAnimal.js');

const PORT = process.env.PORT || 3000;

require('../server.js');

const url = `http://localhost:${PORT}`;

const exampleSpiritAnimal = {
  spiritAnimalName: 'test spiritAnimal',
  spiritAnimalBirthday: new Date()
};

const examplePokemon = {
  pokemonName: 'test pokemonName',
  skill: 'test skill'
};

describe('SpiritAnimal Routes', function() {
  describe('POST: /api/spiritAnimal', function() {
    describe('with a valid body', function() {
      after(done => {
        if (this.tempSpiritAnimal) {
          SpiritAnimal.remove({})
          .then(() => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a spiritAnimal', done => {
        request.post(`${url}/api/spiritAnimal`)
        .send(exampleSpiritAnimal)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.spiritAnimalName).to.equal('test spiritAnimal');
          this.tempSpiritAnimal = res.body;
          done();
        });
      });
    });

    describe('with an invalid body', function() {
      it('should return a 404 error', done => {
        request.post(`${url}/api/spiritAnimal`)
        .send({})
        .end(res => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe('GET: /api/spiritAnimal/:id', function() {
    describe('with a valid body', function() {
      before(done => {
        new SpiritAnimal(exampleSpiritAnimal).save()
        .then(spiritAnimal => {
          this.tempSpiritAnimal = spiritAnimal;
          return SpiritAnimal.findByIdAndAddPokemon(spiritAnimal._id, examplePokemon);
        })
        .then(pokemon => {
          this.tempPokemon = pokemon;
          done();
        })
        .catch(done);
      });

      after(done => {
        if (this.tempSpiritAnimal) {
          SpiritAnimal.remove({})
          .then(() => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a spiritAnimal', done => {
        request.get(`${url}/api/spiritAnimal/${this.tempSpiritAnimal._id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.spiritAnimalName).to.equal('test spiritAnimal');
          expect(res.body.pokemons.length).to.equal(1);
          expect(res.body.pokemons[0].pokemonName).to.equal(examplePokemon.pokemonName);
          expect(res.body.pokemons[0].skill).to.equal(examplePokemon.skill);
          done();
        });
      });
    });

    describe('with an invalid request', function() {
      it('should return a 404 error', done => {
        request.get(`${url}/api/spiritAnimal/39`)
        .end(res => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe('PUT: /api/spiritAnimal/:id', function() {
    describe('with a valid body', function() {
      before(done => {
        new SpiritAnimal(exampleSpiritAnimal).save()
        .then(spiritAnimal => {
          this.tempSpiritAnimal = spiritAnimal;
          done();
        })
        .catch(done);
      });

      after(done => {
        if (this.tempSpiritAnimal) {
          SpiritAnimal.remove({})
          .then(() => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a spiritAnimal', done => {
        var updated = {pokemonName: 'updated pokemonName'};

        request.put(`${url}/api/spiritAnimal/${this.tempSpiritAnimal._id}`)
        .send(updated)
        .end((err, res) => {
          if (err) return done(err);
          let spiritAnimalBirthday = new Date(res.body.spiritAnimalBirthday);
          expect(res.status).to.equal(200);
          expect(res.body.pokemonName).to.equal(updated.pokemonName);
          expect(spiritAnimalBirthday.toString()).to.equal(exampleSpiritAnimal.spiritAnimalBirthday.toString());
          done();
        });
      });
    });
  //
  //   describe('with an invalid request', function() {
  //     it('should return a 404 error', done => {
  //       request.put(`${url}/api/spiritAnimal/3988794549`)
  //       .end(res => {
  //         expect(res.status).to.equal(404);
  //         done();
  //       });
  //     });
  //   });
  // });
  //
  // // describe('DELETE: /api/spiritAnimal/:id', function() {
  //   describe('with a valid body', function() {
  //     before(done => {
  //       new SpiritAnimal(exampleSpiritAnimal).save()
  //       .then(spiritAnimal => {
  //         this.tempSpiritAnimal = spiritAnimal;
  //         done();
  //       })
  //       .catch(done);
  //     });
  //
  //     it('should delete a spiritAnimal and return a 204 error', done => {
  //       request.delete(`${url}/api/spiritAnimal/${this.tempSpiritAnimal._id}`)
  //       .end((err, res) => {
  //         if (err) return done(err);
  //         expect(res.status).to.equal(204);
  //         done();
  //       });
  //     });
  //   });
  //
  //   describe('with an invalid request', function() {
  //     it('should return a 404 error', done => {
  //       request.delete(`${url}/api/spiritAnimal/3988794549`)
  //       .end(res => {
  //         expect(res.status).to.equal(404);
  //         done();
  //       });
  //     });
  //   });
  });
});
