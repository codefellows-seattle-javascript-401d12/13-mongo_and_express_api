'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Library = require('../model/library.js');
const debug = require('debug')('library:book-route-test');

const PORT = process.env.PORT || 3000;

require('../server.js');

const url = `http://localhost:${PORT}`;

const exampleLibrary = {
  name: 'example library',
  timestamp: new Date()
};

const exampleBook = {
  title: 'example title',
  author: 'example author'
};

describe('Book Routes', function(){
  describe('POST: /api/library/:libraryID/book', function(){
      before(done => {
        new Library(exampleLibrary).save()
        .then( library => {
          this.tempLibrary = library;
          done();
        });
      });

      after( done => {
        if(this.tempLibrary){
          this.tempLibrary.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });

    describe('with a valid body', () => {
      it('should return a valid body', done => {
        request.post(`${url}/api/library/${this.tempLibrary._id}/book`)
        .send(exampleBook)
        .end((err,res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(exampleBook.name);
          expect(res.body.libraryID).to.equal(this.tempLibrary._id.toString());
          done();
        });
      });

    });

    describe('with an invalid body', () => {
      it('should return a bad request', done => {
        request.post(`${url}/api/library/${this.tempLibrary._id}/book`)
        .end(res => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });

  describe('GET: /api/library/:libraryID/book/:id', function(){
    before(done => {
      new Library(exampleLibrary).save()
      .then(library => {
        this.tempLibrary = library;
        return Library.findByIdAndAddBook(library._id, exampleBook);
      })
      .then(book => {
        this.tempBook = book;
        done();
      })
      .catch(done);
    });

    after( done => {
        if(this.tempLibrary){
          this.tempLibrary.remove({})
          .then(() => done())
          .catch(done);
          return;
        }
        done();
      });

    describe('with a valid body', () => {
      it('should return a book', done => {
        request.get(`${url}/api/library/${this.tempLibrary._id}/book/${this.tempBook._id}`)
        .end((err,res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('example title');
          expect(res.body.author).to.equal('example author');
          done();
        });
      });
      it('should return not found', done => {
        request.get(`${url}/api/library/${this.tempLibrary._id}/book/6861b7814c46877c3cfb77e9`)
        .end((err,res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body).to.not.have.property('title');
          done();
        });
      });
    });
  });

  describe('PUT: /api/library/:libraryID/book/:id', function(){
    describe('with a valid body', () => {
      before(done => {
        new Library(exampleLibrary).save()
        .then(library => {
          this.tempLibrary = library;
          return Library.findByIdAndAddBook(library._id, exampleBook);
        })
        .then(book => {
          this.tempBook = book;
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

      it('should return a valid body', done => {
        let updated = {title: 'new book', author: 'new author'};

        request.put(`${url}/api/library/${this.tempLibrary._id}/book/${this.tempBook._id}`)
        .send(updated)
        .end((err,res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('new book');
          expect(res.body.author).to.equal('new author');
          done();
        });
      });
      it('should return not found', done => {
        request.put(`${url}/api/library/${this.tempLibrary._id}/book/58659b018078183ddcbdd26f`)
        .end(res => {
          expect(res.status).to.equal(404);
          done();
        })
      });
    });
    describe('with an invalid body', () => {
      before(done => {
        new Library(exampleLibrary).save()
        .then(library => {
          this.tempLibrary = library;
          return Library.findByIdAndAddBook(library._id, exampleBook);
        })
        .then(book => {
          this.tempBook = book;
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
      it('should return bad request', done => {
        let updated = {some:'something', some2: 'some'};

        request.put(`${url}/api/library/${this.tempLibrary._id}/book/${this.tempBook._id}`)
        .send(updated)
        .end(res => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });

  describe('DELETE: /api/library/:libraryID/book/:id', function(){
    describe('with a valid body', () => {
      before(done => {
        new Library(exampleLibrary).save()
        .then(library => {
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
          Library.remove({})
          .then(() => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should remove a book', done => {
        request.delete(`${url}/api/library/${this.tempLibrary._id}/book/${this.tempBook._id}`)
        .end((err,res) => {
          if(err) return done(err);
          expect(res.status).to.equal(204);
          expect(res.body.title).to.equal(undefined);
          expect(res.body.author).to.equal(undefined);
          done();
        });
      });
    });
  });
});
