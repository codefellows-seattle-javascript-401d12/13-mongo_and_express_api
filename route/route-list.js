'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const List = require('../model/list.js');
const createError = require('http-errors');
const Promise = require('bluebird');
const debug = require('debug')('list:route');


const listRoute = module.exports = new Router();

listRoute.post('/api/list', jsonParser, function(req, res, next){
  debug('POST: /api/list');
  req.body.timestamp = new Date();
  console.log(typeof(req.body));
  new List(req.body).save()
  .then( list => res.json(list))
  .catch(next);
});

listRoute.get('/api/list', function(req, res, next){
  debug('GET: /api/list');

  List.findById(req.query.id)
  .then( list => res.json(list))
  .catch(next);
});

listRoute.put('/api/list', jsonParser, function(req, res, next){
  debug('PUT: /api/list');
  req.body.timestamp = new Date();

  List.findById(req.body.id, function(err, list){
    if (err) res.status(500).send(err);

    for(var prop in req.body){
      list[prop] = req.body[prop];
    }
    list.save();
    res.json(list);
  })
  .catch(next);
});

listRoute.delete('/api/list', function(req, res, next){
  debug('DELETE: /api/list');
  List.findByIdAndRemove(req.query.id, function (err, list) {
    if(err || (list == null)) return Promise.reject(createError(404, 'id not found!'));

    var response = {
      message: 'successfully deleted',
      id: list._id
    };
    Promise.resolve(response);
  })
  .then(response => res.json(response))
  .catch(next);
});
