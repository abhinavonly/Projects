const mongoose = require('mongoose');

module.exports = function(config) {

  // connect to the database
  mongoose.Promise = global.Promise;
  mongoose.connect(config.db, function(err) {
    if (err) { throw err; }
  });

  // loading models
  require('./user');
};