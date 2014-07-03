var express = require('express'),
    path = require('path'),
    http = require('http'),
    session = require('express-session'),
    mongoose = require('mongoose'),
    cons = require('consolidate'),
    routes = require('./routes/routes.js'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser');

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
MemcachedStore = require('connect-memcached')(session)
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
      secret  : 'CatOnKeyboard'
    , key     : 'test'
    , proxy   : 'true'
    , store   : new MemcachedStore({
        hosts: ['127.0.0.1:11211']
    })
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(require('less-middleware')(path.join(__dirname, 'public')));
routes.init(app);


if (app.get('env') === 'production') {
  module.exports = app;
} else {
  app.set('port', process.env.PORT || 3000);
  var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
  });
}