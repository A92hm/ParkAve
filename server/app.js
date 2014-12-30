var express = require('express')
  , mongoose = require('mongoose')
  , routes = require('./routes.js')
  , logger = require('morgan')
  , path = require('path')
  , favicon = require('serve-favicon')
  , bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , session = require('express-session')
  , app = express();
    
mongoose.connect('mongodb://localhost/parking');
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

app.use(favicon(path.join(__dirname,'..','client','images','favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(session({secret: 'SHOULD USE NODE_ENV_SECRET', 
               saveUninitialized: true,
               resave: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..' ,'client')));
routes.init(app);

app.set('port', process.env.PORT || 9000);
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});