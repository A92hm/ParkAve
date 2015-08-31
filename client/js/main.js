require.config({
  paths: {
    "jquery": "/bower_components/jquery/dist/jquery.min",
    "bootstrap": "/bower_components/bootstrap/dist/js/bootstrap.min",
    "underscore": "/bower_components/underscore/underscore",
    "backbone": "/bower_components/backbone/backbone",
    "modernizr": "/bower_components/modernizr/modernizr",
    "text": "/bower_components/requirejs-text/text"
  },
  shim: {
    'bootstrap': ['jquery'],
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'underscore': {
      exports: '_'
    },
  }
});

require(['jquery', 'bootstrap', 'underscore', 'backbone', 'modernizr', 
         'routing/router', 'views/application/main'], 
  function($, Bootstrap, _, Backbone, Modernizr, Router, MainAppView) {
    MainAppView.sharedInstance().render();  
    Router.sharedInstance().start();
});