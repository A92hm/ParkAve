require.config({
  paths: {
    "jquery": "/jquery/dist/jquery",
    "stellar": "/jquery.stellar/jquery.stellar",
    "bootstrap": "/bootstrap/dist/js/bootstrap.min",
    "underscore": "/underscore/underscore",
    "backbone": "/backbone/backbone",
    "modernizr": "/modernizr/modernizr",
    "text": "/requirejs-text/text"
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