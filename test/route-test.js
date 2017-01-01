'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const debug = require('debug')('list:test');

const List = require('../model/list.js');
const url = 'http://localhost:3000/api/list';

process.env.MONGODB_URI = 'mongodb://localhost/listtest';

require('../server.js');

var testList = {
  name: 'test file'
};

describe('route testList', function(){
  debug('route:test');
  describe('POST: /api/list', function(){
    debug('POST:test');
    after( done => {
      if(this.testList){
        List.findByIdAndRemove(this.testList._id)
        .then( () => done())
        .catch(done);
        return;
      }
      done();
    });


    it('should generate the list', done => {
      request.post(`${url}`)
     .send({name: 'test file'})
     .end( (err, res) => {
       if(err) return done(err);

       expect(res.status).to.equal(200);
       expect(res.body.name).to.equal('test file');
       expect(res.body).to.have.property('_id');
       this.testList = res.body;
       done();
     });
    });
  });
  describe('GET: /api/list/:id', function(){
    debug('GET:test/:id');

    before( done =>  {
      new List(testList).save()
     .then( list => {
       this.testList = list;
       done();
     })
     .catch(done);
    });
    after( done => {
      if(this.testList){
        List.findByIdAndRemove(this.testList._id)
        .then( () => done())
        .catch(done);
        return;
      }
      done();
    });
    it('should get the list', done => {
      request.get(`${url}/${this.testList._id}`)
     .end( (err, res) => {
       if(err) return done(err);

       expect(res.status).to.equal(200);
       expect(res.body.name).to.equal('test file');
       expect(res.body).to.have.property('_id');
       expect(res.body._id).to.equal(`${this.testList._id}`);
       done();
     });
    });
  });
  describe('PUT: /api/list', function(){
    debug('PUT:test');

    before( done =>  {
      new List(testList).save()
     .then( list => {
       this.testList = list;
       done();
     })
     .catch(done);
    });
    after( done => {
      if(this.testList){
        List.findByIdAndRemove(this.testList._id)
        .then( () => done())
        .catch(done);
        return;
      }
      done();
    });
    it('should update the list', done => {
      request.put(`${url}`)
     .send({place:'Seattle', id:`${this.testList._id}`})
     .end( (err, res) => {
       if(err) return done(err);

       expect(res.status).to.equal(200);
       expect(res.body.name).to.equal('test file');
       expect(res.body).to.have.property('_id');
       expect(res.body._id).to.equal(`${this.testList._id}`);
       expect(res.body.place).to.equal('Seattle');
       done();
     });
    });
    it('should errorout id not found', done => {
      request.put(`${url}`)
     // .send({place:'Seattle', _id:'123456789'})
     .end( (err, res) => {
       console.log('req-', request.body);
       if(err) return done(err);
       console.log('res-', res.body,  'res.status-', res.status);
       expect(res.status).to.equal(404);
       done();
     });
    });
  });
});
