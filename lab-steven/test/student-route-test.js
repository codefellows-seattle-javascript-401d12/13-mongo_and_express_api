'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Student = require('../model/student.js');
const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/listdev';
const url = `http://localhost:${PORT}`;

const sampleStudent = {
  name: 'Test student',
  age: 42
};

describe('Student Routes', function() {
  describe('POST: /api/student', function() {
    
  });
});
