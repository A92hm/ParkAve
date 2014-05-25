var express = require('express')
  , passport = require('passport');

// Configuration for express server
module.exports = function(app, config) {
  app.configure(function () {
    app.use(express.compress());
    app.use(express.static(config.root + '/public'));
    app.set('port', config.port);
    app.set('views', config.root + '/app/views');
    //using jade templating
    app.set('view engine', 'jade'); 
    app.use(express.favicon(config.root + '/public/img/favicon.ico'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use( express.cookieParser() );
    app.use(express.session({ secret: 'CHANGE THIS SECRET! USE NODE.EVN' })); 
    // Remember Me middle-ware
    app.use( function (req, res, next) {
        if ( req.method == 'POST' && req.url == '/login' ) {
            if ( req.body.rememberme ) {
                req.session.cookie.maxAge = 2592000000; // Remember me for 30 days
            } else {
                req.session.cookie.expires = false;
                }
            }
        next();
    });
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    app.use(function(req, res) {
      res.status(404).render('404', { title: '404' });
    });
  });
};

