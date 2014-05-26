var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , csrf = require('express').csrf
  , _ = require('underscore')
  , buy_main_page = require('../app/controllers/buy/buy-main-page')
  , sell_main_page = require('../app/controllers/sell/sell-main-page')
  , user = require('../app/controllers/users')
  , session = require('../app/controllers/session');

// Stores a dictionary with route paths as keys and their corresponding static html files as values.
var URLToStaticFileMap = {
  '/': 'home/home'
};


var renderStaticPage = function(req, res){
  res.render(URLToStaticFileMap[req.route.path], {
      title: 'Park Ave',
      csrfToken: req.csrfToken()
  });
};


module.exports = function(app, io){
/* API Routes */

/* User Routes */
  // Static Pages
  _.each(URLToStaticFileMap, function(value, key){
    app.get(key ,renderStaticPage);
  });

  app.get('/test' ,user.test(io));


  // Other Routes
  app.get( '/buyparking', buy_main_page.index);
  app.get( '/sellparking', sell_main_page.index);

  /* Login Routes */
  app.post('/login' , session.login);
  app.get( '/logout', session.logout);
};
