var express = require('express'),
    path = require('path'),
    http = require('http'),
    mongoose = require('mongoose'),
    cons = require('consolidate'),
    routes = require('./routes/routes.js'),
    io = require('socket.io'),
    //we need access to the controllers here to pass them the socket
    usersController = require('./controllers/users.js'),
    spotsController = require('./controllers/spots.js'),
    lotsController  = require('./controllers/spots.js');


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
app.use(express.favicon());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.bodyParser());
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
// app.use(require('less-middleware')(path.join(__dirname, 'public')));
// routes.init(app);

if (process.env.NODE_ENV === 'production') {
  // For deployment
  routes.init(app);
  module.exports = app;

} else {
  app.set('port', process.env.PORT || 3000);
  var server = http.createServer(app);
  server.listen(app.get('port'), function () {
      console.log("Express server listening on port " + app.get('port'));
  });
  //sockets
  io.listen(server).on('connection', function (socket) {
    //give the io to the controllers
    usersController.socket = socket;
    spotsController.socket = socket;
    lotsController.socket  = socket;
    routes.init(app, socket);
    socket.on('updatingUser', function(model){
      console.log('a user is being updated');
      socket.broadcast.emit('updatedUser', model);
    });
    socket.on('updatingSpot', function(model){
      socket.broadcast.emit('updatedSpot', model);
    });


  });
  console.log(io);
  
  /*
  io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
      console.log(data);
    });
  });

*/
}




