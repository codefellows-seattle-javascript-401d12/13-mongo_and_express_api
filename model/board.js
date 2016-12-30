'use strict';

const mongoose = require('mongoose');
const createError = require('http-errors');
const debug = require('debug')('pin:board');
const Schema = mongoose.Schema;

const Pin = require('./pin.js');

const boardSchema = Schema({
  name: {type: String, required: true},
  timestamp: {type: Date, required: true},
  pins: [{type: Schema.Types.ObjectId, ref: 'pin'}]
});

const Board = module.exports = mongoose.model('board', boardSchema);

Board.findByIdAndAddPin = function(id, pin) {
  debug('findByIdAndAddPin');

  return Board.findById(id)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(board => {
    pin.boardID = board._id;
    this.tempBoard = board;
    return new Pin(pin).save();
  })
  .then(pin => {
    this.tempBoard.pins.push(pin._id);
    this.tempPin = pin;
    return this.tempBoard.save();
  })
  .then(() => {
    return this.tempPin;
  });
};
