var express = require('express'),
    path = require('path'),
    http = require('http'),
    mongoose = require('mongoose'),
    cons = require('consolidate'),
    routes = require('./routes/routes.js'),
    backboneio = require('backbone.io');


mongoose.connect('mongodb://localhost/parking');
var db = mongoose.connection;

db.on('error', function(msg) {
  console.log('Mongoose connection error %s', msg);
});

db.once('open', function() {
  console.log('Mongoose connection established');
});

var MemCachedStore = require('connect-memcached')(express);
var mcds = new MemCachedStore({hosts:'localhost:11211'});
if (!mcds){
	console.log("Error");
	process.exit(-1);
}
// set up the app

var app = express();
app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
	secret: 'This is just a string',
	cookie: {maxAge: 1800000},
	store: mcds
}));

// To use CSRF
/*
app.use(express.csrf());
app.engine('html', cons.mustache);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
*/


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

routes.init(app);
// For local development
app.set('port', process.env.PORT || 3000);


var server = http.createServer(app);
server.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

app.configure(function(){
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  //app.use(app.router);
  app.use(require('less-middleware')(path.join(__dirname, 'public')));
});

//backbone.io
var backend = backboneio.createBackend();
backend.use(function(req, res, next) {
  console.log("HERE I AM");
    console.log(req.backend);
    console.log(req.method);
    console.log(JSON.stringify(req.model));
    next();
});

backend.use(backboneio.middleware.memoryStore());
backboneio.listen(server, { mybackend: backend });

// For deployment
module.exports = {
  test: 'test',
  app: app,
  Backend: backend
}
