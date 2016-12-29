'use strict';

const List = require('../model/list.js');

module.exports = exports = {};


exports.testList = {
  name: 'test file'
};

exports.before = function(){
  return before( done => {
    new List(exports.testList).save()
    .then( list => this.testList = list )
    .catch(done);
    return;
  });
};
exports.after = function(){
  return after( done => {
    if(this.testList){
      List.findByIdAndRemove(this.testList._id)
      .then( () => done())
      .catch(done());
      return;
    }
  });

};
