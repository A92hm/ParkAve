require.config({
  paths: {
    "jquery": "/jquery/dist/jquery",
    "stellar": "/jquery.stellar/jquery.stellar",
    "bootstrap": "/bootstrap/dist/js/bootstrap.min",
    "underscore": "/underscore/underscore",
    "backbone": "/backbone/backbone",
    "modernizr": "/modernizr/modernizr",
    "text": "/requirejs-text/text",
    "socketio":   '../../socket.io/socket.io',
    "backboneio": '../../socket.io/backbone.io'
    
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
    'backboneio': {
      deps: ["backbone", "socketio"]
    }

  }
});

require(['jquery', 'bootstrap', 'underscore', 'backbone', 'modernizr', 
         'routing/router', 'views/application/main', 'socketio', 'backboneio'], 
  function($, Bootstrap, _, Backbone, Modernizr, Router, MainAppView, socketio, backboneio) {
    MainAppView.sharedInstance().render();  
    Router.sharedInstance().start();
    Backbone.io.connect();
  // ensure csrf token is included in ajax requests
  // we haven't talked about this

  /*
  $.ajaxPrefilter(function(options, originalOptions, jqXHR) {
    var token;
    if (!options.crossDomain) {
      token = $('meta[name="csrf-token"]').attr('content');
      if (token) {
        return jqXHR.setRequestHeader('X-CSRF-Token', token);
      }
    }
  });
  */


});