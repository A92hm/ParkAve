var express = require('express'),
  mongoose = require('mongoose'),
  socketIO = require('socket.io'),
  https = require('https'),
  fs = require('fs'),
  config = require('./config/config');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var modelsPath = __dirname + '/app/models';
fs.readdirSync(modelsPath).forEach(function (file) {
  if (file.indexOf('.js') >= 0) {
    require(modelsPath + '/' + file);
  }
});

var app = express(),
	server = https.createServer(config.cred, app),
	io = socketIO.listen(server);

io.set('log level', 1);
require('./config/express')(app, config);
require('./config/routes')(app, io);

server.listen(config.port);

