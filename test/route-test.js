'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const debug = require('debug')('list:test');

const List = require('../model/list.js');
const testFile = require('./generate-test-file.js');
const PORT = 3000;
const url = 'localhost:300/api/list';
const MONGODB_URI = 'mongodb://localhost/list';

require('../server.js');



describe('route testList', function(){
  debug('route:test');
  describe('POST: /api/list', function(){
    debug('POST:test');
    it('should generate the list', done => {

      testFile.after();
      request.post(`${url}`)
     .send({name: 'test file'})
     .end( (err, res) => {
       if(err) return done(err);
       console.log('testFile',testFile());
       expect(res.status).to.equal(200);
       // expect(res.body.id).to.equal()
       done();
     });
    });
  });
});
