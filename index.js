var express = require('express'),
    path = require('path'),
    http = require('http'),
    mongoose = require('mongoose'),
    routes = require('./routes/routes.js');

mongoose.connect('mongodb://localhost/parking');

var db = mongoose.connection;

db.on('error', function(msg) {
  console.log('Mongoose connection error %s', msg);
});

db.once('open', function() {
  console.log('Mongoose connection established');
});

// set up the app

var app = express();

app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
app.use(express.json());
app.use(express.urlencoded());

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

routes.init(app);

// For development
app.set('port', process.env.PORT || 3000);
http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

// For deployment
module.exports = app;
