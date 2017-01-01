'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const List = require('../model/list.js');
// const createError = require('http-errors');
// const Promise = require('bluebird');
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

listRoute.get('/api/list/:id', function(req, res, next){
  debug('GET: /api/list/:id');

  List.findById(req.params.id, function(err, list){
    if(err) res.status(500).send(err);

    if(list === null) res.status(404).send(err);
    if(list !== null) res.json(list);
  })
  .catch(next);
});

listRoute.put('/api/list', jsonParser, function(req, res, next){
  debug('PUT: /api/list');
  req.body.timestamp = new Date();

  List.findById(req.body.id, function(err, list){
    if (err) res.status(404).send(err);

    for(var prop in req.body){
      list[prop] = req.body[prop];
    }
    list.save();
    res.json(list);
  })
  .catch(next);
});

listRoute.delete('/api/list/:id', function(req, res, next){
  debug('DELETE: /api/list/:id');
  List.findByIdAndRemove(req.params.id, function (err, list) {
    if(err) return res.status(500).send(err);
    if(list === null) return res.status(404).send(err);

    var response = {
      message: 'successfully deleted',
      id: list._id
    };
    return res.json(response);
  })
  .catch(next);
});
