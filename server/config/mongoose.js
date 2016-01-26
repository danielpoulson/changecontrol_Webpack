var mongoose = require('mongoose');
var userModel = require('../models/User');
var changeModel = require('../models/Change');
var projectModel = require('../models/Project');
var taskModel = require('../models/Task');
var filesModel = require('../models/File');

module.exports = function() {
	// mongoose.connect('mongodb://au01a112/techservices');
	mongoose.connect('mongodb://localhost/techservices');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function callback() {
    console.log('Technical Services db opened');
  });

};