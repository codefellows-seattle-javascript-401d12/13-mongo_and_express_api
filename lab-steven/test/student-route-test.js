'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Student = require('../model/student.js');
const PORT = process.env.PORT || 8080;
const url = `http://localhost:${PORT}`;

const sampleStudent = {
  name: 'Test student',
  age: 42
};

describe('Student Routes', function() {
  describe('POST: /api/student', function() {
    describe('With a valid body passed in', function() {
      after(done => {
        Student.findByIdAndRemove(this.tempStudent.id)
        .then(() => done)
        .catch(done);
      });

      it('Should return a student.', done => {
        request
        .post(`${url}/api/student`)
        .send(sampleStudent)
        .end((err, response) => {
          if (err) return done(err);
          expect(response.status).to.equal(200);
          expect(response.body.name).to.equal(sampleStudent.name);
          expect(response.body.age).to.equal(sampleStudent.age);
          this.tempStudent = response.body;
          done();
        });
      });
    });

    describe('With an invalid/no body passed in', function() {
      it('Should return a 500 error.', done => {
        request
        .post(`${url}/api/student`)
        .send({})
        .end((err, response) => {
          expect(err).to.be.an('error');
          expect(response.status).to.equal(500);
          expect(response.body.name).to.equal(undefined);
          done();
        });
      });
    });
  });

  describe('GET routes.', function() {
    beforeEach(done => {
      sampleStudent.timestamp = new Date();
      new Student(sampleStudent).save()
      .then(student => {
        this.tempStudent = student;
        done();
      })
      .catch(done);
    });

    afterEach(done => {
      delete sampleStudent.timestamp;
      if (this.tempStudent) {
        Student.findByIdAndRemove(this.tempStudent.id)
        .then(() => done())
        .catch(done);
        return;
      }
      done();
    });

    describe('With a valid ID', () => {
      it('Should return a student.', done => {
        request
        .get(`${url}/api/student/${this.tempStudent._id}`)
        .end((err, response) => {
          if (err) return done(err);
          expect(response.status).to.equal(200);
          expect(response.body.name).to.equal(this.tempStudent.name);
          expect(response.body.age).to.equal(this.tempStudent.age);
          done();
        });
      });
    });

    describe('With an invalid ID', () => {
      it('Should return a 500 status error.', done => {
        request
        .get(`${url}/api/student/69`)
        .end((err, response) => {
          expect(err).to.be.an('error');
          expect(response.status).to.equal(500);
          expect(response.body.name).to.equal(undefined);
          done();
        });
      });
    });

    describe('With no ID.', () => {
      it('Should return an array of IDs.', done => {
        request
        .get(`${url}/api/student`)
        .end((err, response) => {
          if (err) return done(err);
          expect(response.body).to.be.an('array');
          expect(response.body.length).to.be.at.least(1);
          expect(response.status).to.equal(200);
          done();
        });
      });
    });
  });
});
