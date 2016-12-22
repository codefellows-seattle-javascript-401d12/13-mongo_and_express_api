'use strict';

const Router = require('express').Router;
const parseJSON = require('body-parser').json();
const debug = require('debug')('student:student-router');
const Student = require('../model/student.js');
const studentRouter = module.exports = new Router();

studentRouter.post('/api/student', parseJSON, (request, response, next) => {
  debug('Student router POST: /api/student');

  request.body.timestamp = new Date();
  new Student(request.body).save()
  .then(student => response.json(student))
  .catch(next);
});

studentRouter.put('/api/student/:id', parseJSON, (request, response, next) => {
  debug('Student router PUT: /api/student/:id');

  request.body.timestamp = new Date();
  Student.findOneAndUpdate({_id: request.params.id}, request.body)
  .then(student => response.json(student))
  .catch(next);
});
