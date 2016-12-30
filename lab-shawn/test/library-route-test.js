'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Library = require('../model/library.js');
require('debug')('library:library-route-test');


const PORT = process.env.PORT || 3000;

require('../server.js');

const url = `http://localhost:${PORT}`;

const exampleLibrary = {
  name: 'example library',
  timestamp: new Date()
};

const exampleBook = {
  title: 'test book',
  author: 'example author'
};

describe('Library Routes', function(){
  describe('POST: /api/library', function() {
    describe('with a valid body', () => {
      after(done => {
        if(this.tempLibrary){
          Library.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });
      it('should return a library', done => {
        request.post(`${url}/api/library`)
        .send(exampleLibrary)
        .end((err,res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('example library');
          this.tempLibrary = res.body;
          done();
        });
      });
    });
    describe('with an invalid body', () => {
      after(done => {
        if(this.tempLibrary){
          Library.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });
      it('should return bad request', done => {
        request.post(`${url}/api/library`)
        .end((err,res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });

  describe('GET: /api/library/:id', function() {
    describe('with a valid body', () => {
      before(done => {
        new Library(exampleLibrary).save()
        .then( library => {
          this.tempLibrary = library;
          return Library.findByIdAndAddBook(library._id,exampleBook);
        })
        .then(book => {
          this.tempBook = book;
          done();
        })
        .catch(done);
      });

      after(done => {
        if(this.tempLibrary){
          this.tempLibrary.remove({})
          .then(() => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a library', done => {
        request.get(`${url}/api/library/${this.tempLibrary._id}`)
        .end((err,res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('example library');
          expect(res.body.books.length).to.equal(1);
          expect(res.body.books[0].name).to.equal(exampleBook.name);
          done();
        });
      });
      it('should return not found', done => {
        request.get(`${url}/api/library/5864ad212e358215f82ea934`)
        .end(res => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe('PUT: /api/library/:id', function(){
    describe('with a valid body', () => {
      before( done => {
        new Library(exampleLibrary).save()
        .then(library => {
          this.tempLibrary = library;
          done();
        })
        .catch(done);
      });
      after(done => {
        if(this.tempLibrary){
          Library.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });
      it('should return a library', done => {
        var updated = {name: 'new name'};

        request.put(`${url}/api/library/${this.tempLibrary._id}`)
        .send(updated)
        .end((err,res) => {
          if(err) return done(err);
          let timestamp = new Date(res.body.timestamp);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('new name');
          expect(timestamp.toString()).to.equal(exampleLibrary.timestamp.toString());
          done();
        });
      });
      it('should return not found', done => {
        var updated = {name: 'new name'};

        request.put(`${url}/api/library/58658c191ec3e02e32af17d1`)
        .send(updated)
        .end(res => {
          expect(res.status).to.equal(404);
          expect(res.body).to.equal(undefined);
          done();
        });
      });
    });
    describe('with an invalid body', () => {
      before( done => {
        new Library(exampleLibrary).save()
        .then(library => {
          this.tempLibrary = library;
          done();
        })
        .catch(done);
      });
      after(done => {
        if(this.tempLibrary){
          Library.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });
      it('should return a bad request', done => {
        let updated = {test: 'test'};
        request.put(`${url}/api/library/${this.tempLibrary._id}`)
          .send(updated)
          .end(res => {
            expect(res.status).to.equal(400);
            expect(res.body).to.equal(undefined);
            done();
          });
      });
    });
  });

  describe('DELETE: /api/library/:id', function(){
    describe('with a valid body', () => {
      before(done => {
        new Library(exampleLibrary).save()
        .then(library => {
          this.tempLibrary = library;
          done();
        })
        .catch(done);
      });

      after(done => {
        if(this.tempLibrary){
          Library.remove({})
          .then(() => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should remove the library', done => {
        request.delete(`${url}/api/library/${this.tempLibrary._id}`)
        .end((err,res) => {
          if(err) return done(err);
          expect(res.status).to.equal(204);
          expect(res.body.name).to.equal(undefined);
          done();
        });
      });
    });
  });
});
