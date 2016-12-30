'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('pin:board-route');

const Board = require('../model/board.js');
const boardRouter = module.exports = new Router();

boardRouter.post('/api/board', jsonParser, function(req, res, next) {
  debug('POST: /api/board');

  req.body.timestamp = new Date();
  new Board(req.body).save()
  .then(board => res.json(board))
  .catch(next);
});

boardRouter.get('/api/board/:id', function(req, res, next) {
  debug('GET: /api/board/:id');

  Board.findById(req.params.id)
  .populate('pins')
  .then(board => res.json(board))
  .catch(err => next(createError(404, err.message)));
});

boardRouter.put('/api/board/:id', jsonParser, function(req, res, next) {
  debug('PUT: /api/board/:id');

  Board.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(board => res.json(board))
  .catch(next);
});

boardRouter.delete('/api/board/:id', function(req, res, next) {
  debug('DELETE: /api/board/:id');

  Board.findByIdAndRemove(req.params.id)
  .then(() => res.status(204).send())
  .catch(err => next(createError(404, err.message)));
});
